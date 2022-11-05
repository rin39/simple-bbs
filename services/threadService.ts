import { HydratedDocument } from "mongoose";
import dbConnect from "../lib/dbConnect";
import Thread, { IThread } from "../models/Thread";
import Message, { IMessage } from "../models/Message";
import Board, { IBoard } from "../models/Board";
import { DateTime } from "luxon";
import {
  getLastMessagesInThread,
  getMessagesInThread,
  MessageDocument,
} from "./messageService";
import { truncateString } from "../lib/utils";

export interface ThreadDocument {
  _id: string;
  name: string;
  board?: string;
  createdAt?: string;
  firstMessage?: string;
  lastMessages?: MessageDocument[];
}

export async function getNumberOfPagesInBoard(boardId: string) {
  await dbConnect();
  const res = await Thread.count({ board: boardId });

  let pages = res / 10;
  if (pages % 1 > 0) pages++;

  return Math.trunc(pages);
}

export async function getThreadsInBoard(boardId: string, page: number) {
  page--;
  await dbConnect();

  const res = await Thread.find<HydratedDocument<IThread>>({
    board: boardId,
  })
    .populate<{ firstMessage: HydratedDocument<IMessage> }>({
      path: "firstMessage",
      model: Message,
    })
    .sort({ createdAt: -1 })
    .limit(10)
    .skip(page * 10);

  const threads = await Promise.all(
    res.map(async (doc) => {
      const firstMessage = truncateString(doc.firstMessage.text, 800);

      const createdAt = DateTime.fromJSDate(doc.createdAt).toLocaleString(
        DateTime.DATETIME_SHORT
      );

      const lastMessages = await getLastMessagesInThread(
        doc._id.toString(),
        doc.firstMessage._id.toString()
      );

      const thread: ThreadDocument = {
        _id: doc._id.toString(),
        name: doc.name,
        board: doc.board.toString(),
        createdAt,
        firstMessage,
        lastMessages: lastMessages.reverse(),
      };
      return thread;
    })
  );
  return threads;
}

export async function getThreadById(id: string) {
  await dbConnect();
  try {
    const res = await Thread.findById<HydratedDocument<IThread>>(id).populate<{
      board: IBoard;
    }>({
      path: "board",
      model: Board,
    });
    if (!res) return null;
    const thread: ThreadDocument = {
      _id: res._id.toString(),
      name: res.name,
      board: res.board.alias,
    };
    return thread;
  } catch {
    return null;
  }
}

// TODO: find a better way to do it
export async function createThread(name: string, text: string, board: string) {
  await dbConnect();
  const createdAt = new Date();

  const firstMessage: HydratedDocument<IMessage> = new Message({
    text,
    createdAt,
    number: 0,
  });
  await firstMessage.save();

  const thread: HydratedDocument<IThread> = new Thread({
    name,
    board,
    createdAt,
    firstMessage,
  });

  await Message.findOneAndUpdate<IMessage>(
    { _id: firstMessage._id },
    { thread: thread._id }
  );

  await thread.save();

  return thread._id.toString();
}

export async function deleteThread(threadId: string) {
  await dbConnect();

  const thread = await Thread.findByIdAndDelete<HydratedDocument<IThread>>(
    threadId
  );

  if (!thread) throw new Error("Thread does not exist");

  await Message.deleteMany({
    thread: threadId,
  });
}

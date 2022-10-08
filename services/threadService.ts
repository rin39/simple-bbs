import { HydratedDocument } from "mongoose";
import dbConnect from "../lib/dbConnect";
import Thread, { IThread } from "../models/Thread";
import Message, { IMessage } from "../models/Message";

export interface ThreadDocument {
  _id: string;
  name: string;
  board?: string;
  createdAt?: string;
  firstMessage?: string;
}

export async function getThreadsInBoard(boardId: string) {
  await dbConnect();
  const res = await Thread.find<HydratedDocument<IThread>>({
    board: boardId,
  }).populate<{ firstMessage: IMessage }>({
    path: "firstMessage",
    model: Message,
  });
  const threads = res.map((doc) => {
    const thread: ThreadDocument = {
      _id: doc._id.toString(),
      name: doc.name,
      board: doc.board.toString(),
      createdAt: doc.createdAt.toLocaleString(),
      firstMessage: doc.firstMessage.text,
    };
    return thread;
  });
  return threads;
}

export async function getThreadById(id: string) {
  await dbConnect();
  try {
    const res = await Thread.findById<HydratedDocument<IThread>>(id);
    if (!res) return null;
    const thread: ThreadDocument = {
      _id: res._id.toString(),
      name: res.name,
    };
    return thread;
  } catch {
    return null;
  }
}

import { HydratedDocument } from "mongoose";
import dbConnect from "../lib/dbConnect";
import Message, { IMessage } from "../models/Message";
import { truncateString } from "../lib/utils";

export interface MessageDocument {
  _id: string;
  text: string;
  createdAt: string;
}

export async function getMessagesInThread(threadId: string) {
  await dbConnect();

  const res = await Message.find<HydratedDocument<IMessage>>({
    thread: threadId,
  });
  const messages = res.map((doc) => {
    const message: MessageDocument = {
      _id: doc._id.toString(),
      text: doc.text,
      createdAt: doc.createdAt.toLocaleString(),
    };
    return message;
  });

  return messages;
}

export async function getLastMessagesInThread(
  threadId: string,
  firstMessageId: string
) {
  await dbConnect();

  const res = await Message.find<HydratedDocument<IMessage>>({
    thread: threadId,
    _id: { $ne: firstMessageId },
  })
    .sort({ createdAt: -1 })
    .limit(3);

  const messages = res.map((doc) => {
    const text = truncateString(doc.text, 800);

    const message: MessageDocument = {
      _id: doc._id.toString(),
      text,
      createdAt: doc.createdAt.toLocaleString(),
    };
    return message;
  });

  return messages;
}

export async function createMessage(threadId: string, message: string) {
  await dbConnect();

  const newMessage: HydratedDocument<IMessage> = new Message({
    thread: threadId,
    text: message,
    createdAt: new Date(),
  });

  await newMessage.save();
}

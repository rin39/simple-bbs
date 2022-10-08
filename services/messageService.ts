import mongoose, { HydratedDocument } from "mongoose";
import dbConnect from "../lib/dbConnect";
import Message, { IMessage } from "../models/Message";

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
      createdAt: doc.createdAt.toString(),
    };
    return message;
  });
  return messages;
}

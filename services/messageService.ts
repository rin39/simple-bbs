import { HydratedDocument } from "mongoose";
import dbConnect from "../lib/dbConnect";
import Message, { IMessage } from "../models/Message";
import { truncateString } from "../lib/utils";
import { DateTime } from "luxon";

export interface MessageDocument {
  _id: string;
  text: string;
  createdAt: string;
  number: number;
}

export async function getMessagesInThread(threadId: string) {
  await dbConnect();

  const res = await Message.find<HydratedDocument<IMessage>>({
    thread: threadId,
  });

  const messages = res.map((doc) => {
    const createdAt = DateTime.fromJSDate(doc.createdAt).toLocaleString(
      DateTime.DATETIME_SHORT
    );

    const message: MessageDocument = {
      _id: doc._id.toString(),
      text: doc.text,
      createdAt,
      number: doc.number,
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

    const createdAt = DateTime.fromJSDate(doc.createdAt).toLocaleString(
      DateTime.DATETIME_SHORT
    );

    const message: MessageDocument = {
      _id: doc._id.toString(),
      text,
      createdAt,
      number: doc.number,
    };
    return message;
  });

  return messages;
}

export async function createMessage(threadId: string, message: string) {
  await dbConnect();

  let lastNumber = 0;
  const lastMessage = await Message.findOne<HydratedDocument<IMessage>>({
    thread: threadId,
  })
    .sort({ createdAt: -1 })
    .limit(1);
  if (lastMessage) lastNumber = lastMessage.number;

  const newMessage: HydratedDocument<IMessage> = new Message({
    thread: threadId,
    text: message,
    createdAt: new Date(),
    number: lastNumber + 1,
  });

  await newMessage.save();
}

export async function deleteMessage(messageId: string) {
  await dbConnect();

  const message = await Message.findByIdAndDelete<HydratedDocument<IMessage>>(
    messageId
  );

  if (!message) throw new Error("Message does not exist");
}

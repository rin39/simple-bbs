import mongoose from "mongoose";

export interface IMessage {
  text: string;
  thread?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ThreadSchema = new mongoose.Schema<IMessage>({
  text: { type: String, required: true },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
  },
  createdAt: { type: Date, required: true },
});

export default mongoose.models.Message ||
  mongoose.model<IMessage>("Message", ThreadSchema);

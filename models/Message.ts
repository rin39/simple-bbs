import mongoose from "mongoose";

export interface IMessage {
  text: string;
  thread?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ThreadSchema = new mongoose.Schema<IMessage>({
  text: {
    type: String,
    required: [true, "text is required"],
    maxLength: [2000, "text cannot be longer than 2000 characters"],
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
  },
  createdAt: { type: Date, required: [true, "createdAt is required"] },
});

export default mongoose.models.Message ||
  mongoose.model<IMessage>("Message", ThreadSchema);

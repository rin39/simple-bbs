import mongoose from "mongoose";

export interface IThread {
  name: string;
  board: mongoose.Types.ObjectId;
  createdAt: Date;
  firstMessage: mongoose.Types.ObjectId;
}

const ThreadSchema = new mongoose.Schema<IThread>({
  name: {
    type: String,
    required: [true, "name is required"],
    maxLength: [100, "name cannot be longer than 100 characters"],
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: [true, "board is required"],
  },
  createdAt: { type: Date, required: [true, "createdAt is required"] },
  firstMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    required: [true, "firstMessage is required"],
  },
});

export default mongoose.models.Thread ||
  mongoose.model<IThread>("Thread", ThreadSchema);

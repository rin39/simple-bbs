import mongoose from "mongoose";

export interface IThread {
  name: string;
  board: mongoose.Types.ObjectId;
  createdAt: Date;
  firstMessage: mongoose.Types.ObjectId;
}

const ThreadSchema = new mongoose.Schema<IThread>({
  name: { type: String, required: true },
  board: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
  createdAt: { type: Date, required: true },
  firstMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    required: true,
  },
});

export default mongoose.models.Thread ||
  mongoose.model<IThread>("Thread", ThreadSchema);

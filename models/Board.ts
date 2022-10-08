import mongoose from "mongoose";

export interface IBoard {
  name: string;
  alias: string;
}

const BoardSchema = new mongoose.Schema<IBoard>({
  name: { type: String, required: true },
  alias: { type: String, required: true, unique: true },
});

export default mongoose.models.Board ||
  mongoose.model<IBoard>("Board", BoardSchema);

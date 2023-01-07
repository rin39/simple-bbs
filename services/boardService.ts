import { HydratedDocument } from "mongoose";
import dbConnect from "../lib/dbConnect";
import Board, { IBoard } from "../models/Board";

export interface BoardDocument {
  _id: string;
  name: string;
  alias: string;
}

export async function getBoards() {
  await dbConnect();
  const res = await Board.find<HydratedDocument<IBoard>>({});
  const boards = res.map((doc) => {
    const board: BoardDocument = {
      _id: doc._id.toString(),
      name: doc.name,
      alias: doc.alias,
    };
    return board;
  });
  return boards;
}

export async function getBoardByAlias(alias: string) {
  await dbConnect();
  try {
    const res = await Board.findOne<HydratedDocument<IBoard>>({ alias });
    if (!res) return null;
    const board: BoardDocument = {
      _id: res._id.toString(),
      name: res.name,
      alias: res.alias,
    };
    return board;
  } catch {
    return null;
  }
}

export async function createBoard(name: string, alias: string) {
  await dbConnect();
  if ((await Board.find({ alias })).length > 0) {
    throw new Error("Board with such alias already exists");
  }
  const board: HydratedDocument<IBoard> = new Board({ name, alias });
  await board.save();
  return board._id.toString();
}

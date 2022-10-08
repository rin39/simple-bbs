import type { NextApiRequest, NextApiResponse } from "next";
import { createThread } from "../../services/threadService";

type ResponseData = {
  result: string;
  id?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (!req.body.name && !req.body.message && !req.body.board) {
    res.status(500).json({ result: "FAILED" });
  }
  try {
    const newThreadId = await createThread(
      req.body.name,
      req.body.message,
      req.body.board
    );
    res.status(200).json({ result: "OK", id: newThreadId });
  } catch {
    res.status(500).json({ result: "FAILED" }); //TODO
  }
}

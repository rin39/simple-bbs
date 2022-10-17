import type { NextApiRequest, NextApiResponse } from "next";
import { isStringArray } from "../../lib/utils";
import { createThread } from "../../services/threadService";

export type ResponseData = {
  message: string;
  id?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | null>
) {
  if (req.method !== "POST") return res.status(404).send(null);

  if (!isStringArray([req.body.name, req.body.message, req.body.board])) {
    return res.status(500).json({
      message:
        "Name, message and board fields are required and must be of string type",
    });
  }

  try {
    const newThreadId = await createThread(
      req.body.name.trim(),
      req.body.message.trim(),
      req.body.board.trim()
    );
    res
      .status(200)
      .json({ message: "Successfully created new thread", id: newThreadId });
  } catch {
    res.status(500).json({ message: "Failed to create new thread" });
  }
}

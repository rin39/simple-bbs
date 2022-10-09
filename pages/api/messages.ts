import type { NextApiRequest, NextApiResponse } from "next";
import { createMessage } from "../../services/messageService";
import { createThread } from "../../services/threadService";

type ResponseData = {
  result: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (!req.body.thread && !req.body.message) {
    res.status(500).json({ result: "FAILED" });
  }
  try {
    await createMessage(req.body.thread, req.body.message);
    res.status(200).json({ result: "OK" });
  } catch {
    res.status(500).json({ result: "FAILED" });
  }
}

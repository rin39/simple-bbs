import type { NextApiRequest, NextApiResponse } from "next";
import { isStringArray } from "../../lib/utils";
import { createMessage } from "../../services/messageService";

export type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | null>
) {
  if (req.method !== "POST") return res.status(404).send(null);

  if (!isStringArray([req.body.thread, req.body.message])) {
    return res.status(500).json({
      message:
        "Thread and message fields are required and must be of string type",
    });
  }
  try {
    await createMessage(req.body.thread.trim(), req.body.message.trim());
    res.status(200).json({ message: "Successfully created new message" });
  } catch {
    res.status(500).json({ message: "Failed to create new message" });
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import { isStringArray } from "../../../lib/utils";
import { createBoard } from "../../../services/boardService";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { deleteMessage } from "../../../services/messageService";

export type ResponseData = {
  message: string;
};

export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | null>
) {
  // Only allow POST method
  if (req.method !== "POST") return res.status(404).send(null);

  if (!req.session.user)
    return res.status(401).json({ message: "Unauthorized" });

  if (!isStringArray([req.body.name, req.body.alias])) {
    return res.status(400).json({
      message: "Name and alias fields are required and must be of string type",
    });
  }

  try {
    await createBoard(req.body.name.trim(), req.body.alias.trim());
    res.status(200).json({ message: "Successfully created new board" });
  } catch {
    res.status(500).json({ message: "Failed to create new board" });
  }
},
sessionOptions);

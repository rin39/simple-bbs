import type { NextApiRequest, NextApiResponse } from "next";
import { isStringArray } from "../../../lib/utils";
import { createThread, deleteThread } from "../../../services/threadService";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";

export type ResponseData = {
  message: string;
  id?: string;
};

export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | null>
) {
  // Only allow DELETE method
  if (req.method !== "DELETE") return res.status(404).send(null);

  if (!req.session.user)
    return res.status(401).json({ message: "Unauthorized" });

  if (typeof req.query.id !== "string")
    return res.status(400).json({ message: "Id should be of string type" });

  try {
    await deleteThread(req.query.id);
    res.status(200).json({ message: "Successfully deleted thread" });
  } catch (e) {
    res.status(500).json({ message: "Failed to delete thread" });
  }
},
sessionOptions);

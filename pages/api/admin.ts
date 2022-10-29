import type { NextApiRequest, NextApiResponse } from "next";
import { createAdmin } from "../../services/adminService";

export type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | null>
) {
  switch (req.method) {
    case "POST":
      if (!req.body.password) {
        return res.status(500).json({
          message: "Password field is required",
        });
      }
      try {
        await createAdmin(req.body.password);
        res
          .status(200)
          .json({ message: "Successfully created new admin password" });
      } catch {
        res
          .status(500)
          .json({ message: "Failed to create new admin password" });
      }
      break;

    case "GET":
      break;

    default:
      res.status(404).send(null);
  }
}

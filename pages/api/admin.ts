import type { NextApiRequest, NextApiResponse } from "next";
import { createAdmin } from "../../services/adminService";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export type ResponseData = {
  message: string;
  isAdmin?: boolean;
};

export default withIronSessionApiRoute(async function handler(
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
      if (req.session.user) {
        res.json({ message: "Current user is admin", isAdmin: true });
      } else {
        res.json({ message: "Current user is not admin", isAdmin: false });
      }
      break;

    default:
      res.status(404).send(null);
  }
},
sessionOptions);

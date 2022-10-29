import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { login } from "../../services/adminService";
import { sessionOptions } from "../../lib/session";

export type ResponseData = {
  message: string;
};

export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (!(await login(req.body.password))) {
    return res.status(401).json({ message: "Failed to log in" });
  }

  req.session.user = {
    admin: true,
  };

  await req.session.save();
  res.status(200).json({ message: "Successfully logged in" });
},
sessionOptions);

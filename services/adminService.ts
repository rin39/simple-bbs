import { HydratedDocument } from "mongoose";
import dbConnect from "../lib/dbConnect";
import Admin, { IAdmin } from "../models/Admin";
import bcrypt from "bcrypt";

export interface AdminDocument {
  _id: string;
  password: string;
}

export async function getAdmin() {
  await dbConnect();
  try {
    const res = await Admin.findOne<HydratedDocument<IAdmin>>();
    if (!res) return null;
    const admin: AdminDocument = {
      _id: res._id.toString(),
      password: res.password,
    };
    return admin;
  } catch {
    return null;
  }
}

export async function createAdmin(password: string) {
  await dbConnect();

  if (await getAdmin()) throw new Error("Admin password already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin: HydratedDocument<IAdmin> = new Admin({
    password: hashedPassword,
  });
  await admin.save();
}

export async function login(password: string) {
  try {
    const admin = await getAdmin();
    if (!admin) return false;
    if (await bcrypt.compare(password, admin.password)) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
}

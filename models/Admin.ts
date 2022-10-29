import mongoose from "mongoose";

export interface IAdmin {
  password: string;
}

const AdminSchema = new mongoose.Schema<IAdmin>({
  password: { type: String, required: [true, "password is required"] },
});

export default mongoose.models.Admin ||
  mongoose.model<IAdmin>("Admin", AdminSchema);

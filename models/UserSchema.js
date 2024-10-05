import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    photo: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    occupation: { type: String, required: true },
    bio: { type: String, required: true },
    course: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
    order: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    instactor: {
      type: mongoose.Types.ObjectId,
      ref: "Instactor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

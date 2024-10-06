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
    order: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "order",
    populate: {
      path: "course",
    },
  });
  next();
});

export default mongoose.model("User", userSchema);

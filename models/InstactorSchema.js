import mongoose from "mongoose";

const instactorSchema = new mongoose.Schema(
  {
    photo: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    occupation: { type: String, required: true },
    bio: { type: String, required: true },
    course: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

instactorSchema.pre(/^find/, function (next) {
  this.populate({
    path: "course",
    populate: {
      path: "order",
      populate: {
        path: "course",
      },
    },
  });
  next();
});

export default mongoose.model("Instactor", instactorSchema);

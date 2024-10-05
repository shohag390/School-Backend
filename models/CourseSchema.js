import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    instactor: {
      type: mongoose.Types.ObjectId,
      ref: "Instactor",
    },
    order: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Order",
      },
    ],
    photo: { type: String },
    name: { type: String, required: true },
    categorie: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    lessons: { type: String, required: true },
    quizzes: { type: String, required: true },
    certifications: {
      type: String,
      enum: ["yes", "no"],
      default: "yes",
    },
    price: { type: String, required: true },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    averageRating: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

courseSchema.pre(/^find/, function (next) {
  this.populate({
    path: "reviews",
  });
  next();
});

export default mongoose.model("Course", courseSchema);

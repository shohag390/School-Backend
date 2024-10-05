import mongoose from "mongoose";
import Course from "./CourseSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (courseId) {
  const stats = await this.aggregate([
    {
      $match: { course: courseId },
    },
    {
      $group: {
        _id: "$course",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  await Course.findByIdAndUpdate(courseId, {
    totalRating: stats[0].numOfRating,
    averageRating: stats[0].avgRating,
  });
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.course);
});

export default mongoose.model("Review", reviewSchema);

import Course from "../models/CourseSchema.js";
import Review from "../models/ReviewSchema.js";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).populate("user");

    res.status(200).json({
      success: true,
      message: "Successful Get",
      data: reviews,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

//create review
export const createReview = async (req, res) => {
  const courseId = req.params.id;
  const newReview = new Review({
    ...req.body,
    course: courseId,
    user: req.userId,
  });

  try {
    const review = await newReview.save();
    await Course.updateOne(
      {
        _id: courseId,
      },
      {
        $push: {
          reviews: review._id,
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Review submited",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "There was a server site error",
    });
  }
};

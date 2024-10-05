import Course from "../models/CourseSchema.js";
import Instactor from "../models/InstactorSchema.js";

export const uploadCourse = async (req, res) => {
  try {
    const course = new Course({
      ...req.body,
      instactor: req.userId,
    });

    const saveCourse = await course.save();

    await Instactor.updateOne(
      {
        _id: req.userId,
      },
      {
        $push: {
          course: saveCourse._id,
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Successfully Upload",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Faild to Upload",
    });
  }
};

export const getSingleCourse = async (req, res) => {
  const id = req.params.id;
  try {
    const course = await Course.findById(id)
      .populate("instactor")
      .populate("reviews");

    res.status(200).json({
      success: true,
      message: "Course find successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "No Course found",
    });
  }
};

export const getAllCourse = async (req, res) => {
  try {
    const course = await Course.find({})
      .populate("instactor")
      .populate("reviews");

    res.status(200).json({
      success: true,
      message: "Course find successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Not found",
    });
  }
};

export const deleteCourse = async (req, res) => {
  const id = req.params.id;
  try {
    await Course.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Faild to Delete",
    });
  }
};

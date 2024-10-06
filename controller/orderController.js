import Course from "../models/CourseSchema.js";
import Order from "../models/OrderSchema.js";
import User from "../models/UserSchema.js";

export const getAllOrder = async (req, res) => {
  try {
    const allOrder = await Order.find({});

    res.status(200).json({
      success: true,
      message: "Successful Get",
      data: allOrder,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

//create review
export const postOrder = async (req, res) => {
  const courseId = req.params.id;
  const newOrder = new Order({
    course: courseId,
    user: req.userId,
  });

  try {
    const orderId = await newOrder.save();
    await Course.updateOne(
      {
        _id: courseId,
      },
      {
        $push: {
          order: orderId._id,
        },
      }
    );
    await User.updateOne(
      {
        _id: req.userId,
      },
      {
        $push: {
          order: orderId._id,
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Order submited",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "There was a server site error",
    });
  }
};

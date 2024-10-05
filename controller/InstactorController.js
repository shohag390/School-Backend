import Instactor from "../models/InstactorSchema.js";

export const updateInstactor = async (req, res) => {
  const id = req.params.id;
  try {
    const updateInstactor = await Instactor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Successfully Updated",
      data: updateInstactor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Faild to update",
    });
  }
};

export const deleteInstactor = async (req, res) => {
  const id = req.params.id;
  try {
    await Instactor.findByIdAndDelete(id);

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

export const getSingleInstactor = async (req, res) => {
  const id = req.params.id;
  try {
    const techer = await Instactor.findById(id).select("-password");

    res.status(200).json({
      success: true,
      message: "techer Found",
      data: techer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "No techer found",
    });
  }
};

export const getAllInstactor = async (req, res) => {
  try {
    const techer = await Instactor.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "techer Found",
      data: techer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Not found",
    });
  }
};

export const getInstactorProfile = async (req, res) => {
  const techerId = req.userId;
  try {
    const techer = await Instactor.findById(techerId).populate("course");

    if (!techer) {
      return res.status(404).json({
        success: false,
        message: "techer not found",
      });
    }

    const { password, ...rest } = techer._doc;

    res.status(200).json({
      success: true,
      message: "profile info is getting",
      data: { ...rest },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something want wrong, can not get",
    });
  }
};

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/UserSchema.js";
import Instactor from "../models/InstactorSchema.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "365d",
    }
  );
};

export const register = async (req, res) => {
  const { photo, name, email, phone, occupation, password, bio, role } =
    req.body;

  try {
    let user = null;

    if (role === "student") {
      user = await User.findOne({ email });
    } else if (role === "admin") {
      user = await Instactor.findOne({ email });
    }

    //check if user exist
    if (user) {
      return res.status(400).json({
        message: "user already exist",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "student") {
      user = new User({
        name,
        email,
        password: hashPassword,
        phone,
        occupation,
        bio,
        photo,
        role,
      });
    }

    if (role === "admin") {
      user = new Instactor({
        name,
        email,
        password: hashPassword,
        phone,
        occupation,
        bio,
        photo,
        role,
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User successfully created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error, Try again",
    });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;
  try {
    let user = null;
    const student = await User.findOne({ email });
    const techer = await Instactor.findOne({ email });

    if (student) {
      user = student;
    }

    if (techer) {
      user = techer;
    }

    //check if user exist or not
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    //compare password

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        status: false,
        message: "You have no account . Please sign up first",
      });
    }

    //get token
    const token = generateToken(user);

    const { password, role, ...rest } = user._doc;

    res.status(200).json({
      status: true,
      message: "Successfully login",
      token,
      data: user,
      role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Faild to login , Please try again",
    });
  }
};

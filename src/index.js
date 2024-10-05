import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "../routes/authRoute.js";
import userRouter from "../routes/userRoute.js";
import instactorRouter from "../routes/instactorRoute.js";
import courseRouter from "../routes/courseRoute.js";
import reviewRouter from "../routes/reviewRoute.js";
import dotenv from "dotenv";

//config
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5000;

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the server",
  });
});

// Database Connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB database is connected");
  } catch (error) {
    console.log("MongoDB database connection faild");
  }
};

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/instactor", instactorRouter);
app.use("/api/course", courseRouter);
app.use("/api", reviewRouter);

app.listen(port, () => {
  connectDB();
  console.log(`server is running at http://localhost:${port}`);
});

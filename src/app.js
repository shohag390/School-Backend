import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "../routes/authRoute.js";
import userRouter from "../routes/userRoute.js";
import instactorRouter from "../routes/instactorRoute.js";
import courseRouter from "../routes/courseRoute.js";
import reviewRouter from "../routes/reviewRoute.js";

const app = express();

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the server",
  });
});

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

export default app;

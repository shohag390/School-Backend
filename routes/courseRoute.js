import express from "express";
import {
  deleteCourse,
  getAllCourse,
  getSingleCourse,
  uploadCourse,
} from "../controller/courseController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const courseRouter = express.Router();

courseRouter.post("/upload", authenticate, restrict(["admin"]), uploadCourse);
courseRouter.get("/", getAllCourse);
courseRouter.get("/:id", getSingleCourse);
courseRouter.delete("/:id", authenticate, restrict(["admin"]), deleteCourse);

export default courseRouter;

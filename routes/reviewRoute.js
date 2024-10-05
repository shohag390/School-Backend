import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import { createReview, getAllReviews } from "../controller/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.get("/", getAllReviews);
reviewRouter.post(
  "/review/:id",
  authenticate,
  restrict(["student"]),
  createReview
);

export default reviewRouter;

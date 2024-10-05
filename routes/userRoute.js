import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  getUserProfile,
  updateUser,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.get("/:id", authenticate, restrict(["student"]), getSingleUser);
userRouter.get("/", authenticate, restrict(["student"]), getAllUser);

userRouter.get(
  "/profile/me",
  authenticate,
  restrict(["student"]),
  getUserProfile
);

userRouter.put("/:id", authenticate, restrict(["student"]), updateUser);

userRouter.delete("/:id", authenticate, restrict(["student"]), deleteUser);

export default userRouter;

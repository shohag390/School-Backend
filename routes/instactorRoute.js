import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import {
  deleteInstactor,
  getAllInstactor,
  getInstactorProfile,
  getSingleInstactor,
  updateInstactor,
} from "../controller/InstactorController.js";

const instactorRouter = express.Router();

instactorRouter.get("/", getAllInstactor);
instactorRouter.get("/:id", getSingleInstactor);
instactorRouter.put("/:id", authenticate, restrict(["admin"]), updateInstactor);
instactorRouter.delete(
  "/:id",
  authenticate,
  restrict(["admin"]),
  deleteInstactor
);
instactorRouter.get(
  "/profile/me",
  authenticate,
  restrict(["admin"]),
  getInstactorProfile
);
export default instactorRouter;

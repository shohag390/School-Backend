import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import { getAllOrder, postOrder } from "../controller/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/order", getAllOrder);
orderRouter.post("/order/:id", authenticate, restrict(["student"]), postOrder);

export default orderRouter;

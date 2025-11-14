import express from "express";
import { createOrderController } from "../../controllers/order.controller";
import { getAllOrdersController } from "../../controllers/getOrder.controller";

const orderRouter = express.Router();

orderRouter.post("/orders", createOrderController);
orderRouter.get("/orders", getAllOrdersController);

export default orderRouter;

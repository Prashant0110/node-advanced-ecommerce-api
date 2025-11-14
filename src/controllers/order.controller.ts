import { Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { OrderSchema } from "../validators/input.validator";
import { getRedisConnObject } from "../config/redis.config";

export async function createOrderController(req: Request, res: Response) {
  try {
    const order = await OrderSchema.parse(req.body);

    const orderData = await OrderService(order);
    const keys = await getRedisConnObject().keys("orders*");

    if (keys.length > 0) {
      await getRedisConnObject().del(...keys);
    }
    res.status(201).json({
      message: "Order created successfully",
      success: true,
      data: orderData,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create order",
      success: false,
      error: (error as Error).message,
    });
  }
}

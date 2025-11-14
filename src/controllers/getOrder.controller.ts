import { getRedisConnObject } from "../config/redis.config";
import {
  GetAllOrdersService,
  GetOrderService,
} from "../services/getOrder.service";

import { Request, RequestHandler, Response } from "express";
export async function getOrderController(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid order ID",
        success: false,
      });
    }
    const order = await GetOrderService(id);
    res.status(200).json({
      message: "Order fetched successfully",
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to fetch order",
      success: false,
      error: (error as Error).message,
    });
  }
}

export const getAllOrdersController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const search = (req.query.search as string) || "";

    if (page < 1 || limit < 1) {
      res.status(400).json({
        message: "Page and limit must be positive numbers",
        success: false,
      });
    }

    const cacheKey = `orders:${search || ""}:${page}:${limit}`;

    const cacheData = await getRedisConnObject().get(cacheKey);

    if (cacheData) {
      res.status(200).json(JSON.parse(cacheData));
      return;
    }

    const ordersData = await GetAllOrdersService(page, limit, search);
    await getRedisConnObject().setex(cacheKey, 30, JSON.stringify(ordersData));
    res.status(200).json({
      message: "Orders fetched successfully",
      success: true,
      data: ordersData,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to fetch order",
      success: false,
      error: (error as Error).message,
    });
  }
};

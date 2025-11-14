import { confirmOrder } from "../repo/confirmOrder";

export async function ConfirmOrderService(id: number) {
  const confirmOrders = await confirmOrder(id);
  if (!confirmOrders) {
    throw new Error("Order not found");
  }
  return confirmOrders;
}

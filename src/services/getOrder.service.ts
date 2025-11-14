import { getOrder, getAllOrders } from "../repo/getOrder";

export async function GetOrderService(id: number) {
  const order = await getOrder(id);
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
}

export async function GetAllOrdersService(
  page?: number,
  limit?: number,
  search?: string
) {
  const currentPage = page && page > 0 ? page : 1;
  const perPage = limit && limit > 0 ? limit : 10;

  const skip = (currentPage - 1) * perPage;
  const take = perPage;

  const { orders, totalCount } = await getAllOrders(skip, take, search);
  const totalPages = Math.ceil(totalCount / perPage);

  return { orders, totalCount, currentPage, totalPages };
}

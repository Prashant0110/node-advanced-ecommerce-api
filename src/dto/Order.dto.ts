export type OrderItemDto = {
  productId: number;
  quantity: number;
};

export type OrderDto = {
  userId: number;
  items: OrderItemDto[];
};

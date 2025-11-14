import { PrismaClient } from "@prisma/client";
import { OrderDto } from "../dto/Order.dto";
import { createOrder } from "../repo/Order";
import { ProductService } from "./product.service";
import { producerQueue } from "../queue/confirmOrderQueue";

const prisma = new PrismaClient();

export async function OrderService(orderDataDto: OrderDto) {
  const order = await prisma.$transaction(async (tx) => {
    const productIds = orderDataDto.items.map((item) => item.productId);
    const { products } = await ProductService(productIds, tx);

    const totalAmount = products.reduce((acc: number, item) => {
      const itemQuantity =
        orderDataDto.items.find((i) => i.productId === item.id)?.quantity || 0;
      return acc + item.price * itemQuantity;
    }, 0);

    // 4. Creating the order using the calculated total amount
    const orderData = await createOrder(
      {
        user: { connect: { id: orderDataDto.userId } },
        totalPrice: totalAmount,
        orderItems: {
          create: orderDataDto.items.map((item) => ({
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
            user: { connect: { id: orderDataDto.userId } },
          })),
        },
        status: "PENDING",
      },
      tx
    );

    return orderData;
  });

  await producerQueue.add("order-completion", { orderId: order.id });

  return order;
}

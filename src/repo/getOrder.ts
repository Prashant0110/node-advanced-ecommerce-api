import { OrderStatus, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getOrder(id: number) {
  const order = await prisma.orders.findUnique({ where: { id } });
  return order;
}

//search by orderId, orderStatus, userId

export async function getAllOrders(
  skip?: number,
  take?: number,
  search?: string
) {
  const searchFilter: any = {};

  if (search) {
    const searchNumber = parseInt(search, 10);
    const statusOfOrder = Object.values(OrderStatus).find(
      (status) => status.toLowerCase() === search.toLowerCase()
    );

    searchFilter.OR = [
      {
        id: isNaN(searchNumber) ? undefined : searchNumber,
      },
      {
        customerId: isNaN(searchNumber) ? undefined : searchNumber,
      },

      {
        orderItems: {
          some: {
            product: {
              name: { contains: search },
            },
          },
        },
      },

      ...(statusOfOrder
        ? [
            {
              orderStatus: {
                equals: statusOfOrder,
              },
            },
          ]
        : []),
    ];
  }

  const [orders, totalCount] = await Promise.all([
    prisma.orders.findMany({
      where: search ? searchFilter : {},
      skip,
      take,
      include: {
        user: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    }),
    prisma.orders.count({
      where: search ? searchFilter : {},
    }),
  ]);

  return { orders, totalCount };
}

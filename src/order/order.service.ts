import { OrderStatus } from "../generated/enums";
import { prisma } from "../lib/prisma";

const createOrder = async (customerId: string, payload: any) => {
  const { items, deliveryAddress } = payload;

  if (!deliveryAddress) {
    throw new Error("Delivery address is required");
  }

  if (!items || items.length === 0) {
    throw new Error("Order must contain at least one meal");
  }

  const mealIds = items.map((item: any) => item.mealId);

  const meals = await prisma.meal.findMany({
    where: {
      id: { in: mealIds },
      isAvailable: true,
    },
  });

  if (meals.length !== mealIds.length) {
    throw new Error("One or more meals are unavailable");
  }

  let totalPrice = 0;

  const orderItemsData = items.map((item: any) => {
    const meal = meals.find((m) => m.id === item.mealId);

    if (!meal) {
      throw new Error("Meal not found");
    }

    const itemTotal = meal.price * item.quantity;
    totalPrice += itemTotal;

    return {
      mealId: meal.id,
      quantity: item.quantity,
      price: meal.price,
    };
  });

  const order = await prisma.order.create({
    data: {
      customerId,
      totalPrice,
      deliveryAddress,
      status: OrderStatus.PLACED,
      orderItems: {
        create: orderItemsData,
      },
    },
    include: {
      orderItems: {
        include: {
          meal: true,
        },
      },
    },
  });

  return order;
};

const getCustomerOrders = async (customerId: string) => {
  return prisma.order.findMany({
    where: { customerId },
    include: {
      orderItems: {
        include: {
          meal: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getOrderById = async (customerId: string, orderId: string) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerId,
    },
    include: {
      orderItems: {
        include: {
          meal: true,
        },
      },
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};

const getAllOrders = async (sortBy?: string) => {
  const result = await prisma.order.findMany({
    include: {
      orderItems: {
        include: {
          meal: true,
        },
      },
      customer: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (sortBy === "popularity") {
    // Calculate total quantity for each meal across all orders
    const mealPopularity: Record<string, number> = {};
    result.forEach((order) => {
      order.orderItems.forEach((item) => {
        mealPopularity[item.mealId] =
          (mealPopularity[item.mealId] || 0) + item.quantity;
      });
    });

    // Sort orders by the maximum popularity of any meal they contain
    return result.sort((a, b) => {
      const aMaxPopularity = Math.max(
        ...a.orderItems.map((item) => mealPopularity[item.mealId] || 0),
        0,
      );
      const bMaxPopularity = Math.max(
        ...b.orderItems.map((item) => mealPopularity[item.mealId] || 0),
        0,
      );

      if (bMaxPopularity !== aMaxPopularity) {
        return bMaxPopularity - aMaxPopularity;
      }

      // Secondary sort by order creation time
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  return result;
};

export const orderService = {
  createOrder,
  getCustomerOrders,
  getOrderById,
  getAllOrders,
};

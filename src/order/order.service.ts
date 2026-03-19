import { OrderStatus } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";


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
      isAvailable: true
    }
  });

  if (meals.length !== mealIds.length) {
    throw new Error("One or more meals are unavailable");
  }

  let totalPrice = 0;

  const orderItemsData = items.map((item: any) => {
    const meal = meals.find(m => m.id === item.mealId);

    if (!meal) {
      throw new Error("Meal not found");
    }

    const itemTotal = meal.price * item.quantity;
    totalPrice += itemTotal;

    return {
      mealId: meal.id,
      quantity: item.quantity,
      price: meal.price
    };
  });

  const order = await prisma.order.create({
    data: {
      customerId,
      totalPrice,
      deliveryAddress,
      status: OrderStatus.PLACED,
      orderItems: {
        create: orderItemsData
      }
    },
    include: {
      orderItems: {
        include: {
          meal: true
        }
      }
    }
  });

 return order
};

const getCustomerOrders = async (customerId: string) => {
  return prisma.order.findMany({
    where: { customerId },
    include: {
      orderItems: {
        include: {
          meal: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};

const getOrderById = async (customerId: string, orderId: string) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerId
    },
    include: {
      orderItems: {
        include: {
          meal: true
        }
      }
    }
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};

export const orderService = {
  createOrder,
  getCustomerOrders,
  getOrderById
};
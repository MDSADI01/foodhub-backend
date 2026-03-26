import { OrderStatus } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"



const createProviderProfile = async (userId: string, payload: any) => {

    const existingProfile = await prisma.providerProfile.findUnique({
      where: { userId }
    });
  
    if (existingProfile) {
      throw new Error("Provider profile already exists");
    }
  
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!user || user.role !== "PROVIDER") {
      throw new Error("Only provider users can create profile");
    }
  
    const result = await prisma.providerProfile.create({
      data: {
        userId,
        image: payload?.image,
        restaurantName: payload.restaurantName,
        description: payload?.description,
        address: payload?.address,
        phone: payload?.phone,
     
      },
    });
  
    return result;
  };
  



  const getProviderProfile = async (userId: string) => {
    const providerProfile = await prisma.providerProfile.findUnique({
      where: { userId },
      include: {
        meals: {
          select:{
           name:true,
           category:{
            select:{
              name:true
            }
           }
          },
          orderBy: {
            createdAt: "desc", 
          },
        },
      },
    });
  
    if (!providerProfile) {
      throw new Error("Provider profile not found");
    }
  
    return providerProfile;
  };
  

const createMeal = async (userId:string, payload: any)=>{
    
const providerProfile = await prisma.providerProfile.findUnique({
    where:{
        userId:userId
    }
})

if (!providerProfile) {
    throw new Error("Provider profile not found");
  }


const category = await prisma.category.findUnique({
     where:{
      name:payload.category
     },
     select:{
      id:true
     }
})


if (!category) {
  throw new Error("Category not found");
}



    const result = await prisma.meal.create({
        data:{
            name: payload.name,
            description: payload.description,
            price: Number(payload.price),
            imageUrl: payload.imageUrl,
            categoryId: category.id,
            providerId: providerProfile.id
        }
    })

    return result
}

const getMealsByProvider = async (providerId: string) => {
  
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: providerId },
  });

  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }


  const meals = await prisma.meal.findMany({
    where: { providerId: providerProfile.id },
    include: {
      category: {
        select: { name: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return meals;
};




const updateMeal = async (
  userId: string,
  mealId: string,
  payload: any
) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }

  const existingMeal = await prisma.meal.findUnique({
    where: { id: mealId },
  });

  if (!existingMeal) {
    throw new Error("Meal not found");
  }

  if (existingMeal.providerId !== providerProfile.id) {
    throw new Error("Unauthorized! You are not allowed to update this meal");
  }

  const updatedMeal = await prisma.meal.update({
    where: { id: mealId },
    data: {
      name: payload.name ?? existingMeal.name,
      description: payload.description ?? existingMeal.description,
      price: payload.price ? Number(payload.price) : existingMeal.price,
      imageUrl: payload.imageUrl ?? existingMeal.imageUrl,
      isAvailable:
        payload.isAvailable !== undefined
          ? payload.isAvailable
          : existingMeal.isAvailable,
    },
  });

  return updatedMeal;
};



const deleteMeal = async (userId: string, mealId: string) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }

  const meal = await prisma.meal.findUnique({
    where: { id: mealId },
  });

  if (!meal) {
    throw new Error("Meal not found");
  }

  if (meal.providerId !== providerProfile.id) {
    throw new Error("Unauthorized action");
  }

 const result = await prisma.meal.delete({
    where: { id: mealId },
  });

  return result;
};


const getProviderOrders = async (userId: string) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }

  return prisma.order.findMany({
    where: {
      orderItems: {
        some: {
          meal: {
            providerId: providerProfile.id,
          },
        },
      },
    },
    include: {
      customer: {
        select: { name: true },
      },
      orderItems: {
        where: {
          meal: {
            providerId: providerProfile.id,
          },
        },
        include: {
          meal: {
            select: { name: true, price: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const updateMainOrderStatus = async (orderId: string) => {
  const items = await prisma.orderItem.findMany({
    where: { orderId },
  });

  const allDelivered = items.every(i => i.status === "DELIVERED");
  const anyPreparing = items.some(i => i.status === "PREPARING");
  const anyCancelled = items.some(i => i.status === "CANCELLED");

  let status: OrderStatus = "PLACED";

  if (allDelivered) status = "DELIVERED";
  else if (anyPreparing) status = "PREPARING";
  else if (anyCancelled) status = "CANCELLED";

  await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};

const updateOrderItemStatus = async (
  userId: string,
  orderItemId: string,
  status: OrderStatus
) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }

  const orderItem = await prisma.orderItem.findUnique({
    where: { id: orderItemId },
    include: { meal: true },
  });

  if (!orderItem) {
    throw new Error("Order item not found");
  }

  if (orderItem.meal.providerId !== providerProfile.id) {
    throw new Error("Unauthorized");
  }

  const updated = await prisma.orderItem.update({
    where: { id: orderItemId },
    data: { status },
  });

  await updateMainOrderStatus(orderItem.orderId);

  return updated;
};










export const providerService = {
    createMeal,createProviderProfile,updateMeal,deleteMeal,getProviderProfile,getMealsByProvider,getProviderOrders,updateOrderItemStatus
}

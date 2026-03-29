import { prisma } from "../lib/prisma";

const getAllMeals = async () => {
  const result = await prisma.meal.findMany();

  return result;
};

const getMealsById = async (mealId: string) => {
  if (!mealId) {
    throw new Error("Meal ID is required");
  }

  const result = await prisma.meal.findFirst({
    where: {
      id: mealId,
    },
    include: {
      provider: {
        select: {
          restaurantName: true,
        },
      },
    },
  });

  return result;
};

export const mealService = {
  getAllMeals,
  getMealsById,
};

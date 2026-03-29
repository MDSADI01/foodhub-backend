import { Role } from "../generated/enums";
import { prisma } from "../lib/prisma";

const createReview = async (customerId: string, payload: any) => {
  const { mealId, rating, comment } = payload;

  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  const meal = await prisma.meal.findUnique({
    where: {
      id: mealId,
    },
  });

  if (!meal) {
    throw new Error("Meal not found");
  }

  const result = await prisma.review.create({
    data: {
      rating,
      comment,
      customerId,
      mealId,
    },
  });

  return result;
};

const getAllReviews = async () => {
  const result = await prisma.review.findMany({
    include: {
      customer: {
        select: {
          name: true,
        },
      },
      meal: {
        select: {
          name: true,
        },
      },
    },
  });

  return result;
};

const getMyReviews = async (customerId: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id: customerId,
    },
    select: {
      reviews: {
        include: {
          meal: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return result?.reviews;
};

const deleteReview = async (
  customerId: string,
  reviewId: string,
  role: string
) => {
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  if (role !== Role.ADMIN && review.customerId !== customerId) {
    throw new Error("You are not allowed to delete this review");
  }

  const result = await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });

  return result;
};

const getReviewsByMealId = async (mealId: string) => {
  const meal = await prisma.meal.findUnique({
    where: { id: mealId },
  });

  if (!meal) {
    throw new Error("Meal not found");
  }

  const reviews = await prisma.review.findMany({
    where: { mealId },
    include: {
      customer: {
        select: { name: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reviews;
};

export const reviewService = {
  createReview,
  getAllReviews,
  getMyReviews,
  deleteReview,
  getReviewsByMealId,
};

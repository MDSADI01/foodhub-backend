import { Request, Response } from "express";
import { providerService } from "./provider.service";

const createProviderProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized",
      });
    }

  const result = await providerService.createProviderProfile(userId,req.body as any)

  res.status(201).json({
    success: true,
    message: "Provider Profile created successfully",
    data: result,
  });

  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};



const getProviderProfile = async (req:Request, res:Response) => {
  try {
    const userId = req.user?.id as string;

    const result = await providerService.getProviderProfile(userId);

    res.status(200).json({
      success: true,
      message: "Provider dashboard data retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


const createMeal = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await providerService.createMeal(userId, req.body);

    res.status(201).json({
      success: true,
      message: "Meal created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


const updateMeal = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string; // from auth middleware
    const mealId = req.params.id as string;
    const payload = req.body ;

    const result = await providerService.updateMeal(
      userId,
      mealId,
      payload
    );

    res.status(200).json({
      success: true,
      message: "Meal updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteMeal = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const mealId = req.params.id as string;

  const result =  await providerService.deleteMeal(userId, mealId);

    res.status(200).json({
      success: true,
      message: "Meal deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const providerController = {
  createMeal,
  createProviderProfile,
  updateMeal,
  deleteMeal,
  getProviderProfile
};

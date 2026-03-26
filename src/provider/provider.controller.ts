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


export const getMealsByProvider = async (req: Request, res: Response) => {
  try {
    const providerId = req.user?.id as string;

    const meals = await providerService.getMealsByProvider(providerId);

    return res.status(200).json({ success: true, data: meals });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message || "Failed to fetch meals" });
  }
};


const updateMeal = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string; 
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


const getProviderOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string; 
    const result = await providerService.getProviderOrders(userId);

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateOrderItemStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const  orderItemId  = req.params.id as string;
    const { status } = req.body;

    const result = await providerService.updateOrderItemStatus(
      userId,
      orderItemId,
      status
    );

    res.status(200).json({
      success: true,
      message: "Order item status updated",
      data: result,
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
  getProviderProfile,
  getMealsByProvider,
  getProviderOrders,
  updateOrderItemStatus
};

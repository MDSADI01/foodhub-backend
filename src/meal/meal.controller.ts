import { Request, Response } from "express";
import { mealService } from "./meal.service";

const getAllMeals = async (req: Request, res: Response)=>{

 try {

    const result = await mealService.getAllMeals();

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }


}




const getMealsById = async (req: Request, res: Response)=>{

    try {
       
       const mealId = req.params.id as string;

       const result = await mealService.getMealsById(mealId);
   
       res.status(200).json({
         success: true,
         data: result
       });
     } catch (error: any) {
       res.status(400).json({
         success: false,
         message: error.message
       });
     }
   
   
   }


export const mealController = {
    getAllMeals,
    getMealsById
}
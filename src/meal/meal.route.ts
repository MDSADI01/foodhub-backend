import { Router } from "express";
import { mealController } from "./meal.controller";


export const router = Router();

router.get("/",mealController.getAllMeals)
router.get("/:id",mealController.getMealsById)

export const mealRoutes = router;


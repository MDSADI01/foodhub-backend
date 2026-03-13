import { Router } from "express";
import { categoryController } from "./categories.controller";

const router = Router();

router.post("/",categoryController.createCategory)

export const categoryRoutes = router;

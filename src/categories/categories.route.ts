import { authorization } from './../middleware/authorization';
import { Router } from "express";
import { categoryController } from "./categories.controller";
import { Role } from '../../generated/prisma/enums';

const router = Router();

router.post("/",authorization(Role.ADMIN),categoryController.createCategory)
router.get("/",authorization(Role.ADMIN),categoryController.getAllCategory)
router.delete("/:id",authorization(Role.ADMIN),categoryController.deleteCategory)

export const categoryRoutes = router;

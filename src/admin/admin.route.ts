import { Router } from "express";
import { adminController } from "./admin.controller";
import { authorization } from "../middleware/authorization";
import { Role } from "../../generated/prisma/enums";

const router = Router();


router.get("/users",authorization(Role.ADMIN), adminController.getAllUsers);
router.patch("/users/:id",authorization(Role.ADMIN),adminController.updateUserStatus)

export const adminRoutes = router;
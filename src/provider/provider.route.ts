import { authorization } from './../middleware/authorization';
import { Router } from "express";
import { providerController } from "./provider.controller";
import { Role } from '../../generated/prisma/enums';

const router = Router();

router.post("/meals",authorization(Role.PROVIDER), providerController.createMeal)

router.post("/profile",authorization(Role.PROVIDER),providerController.createProviderProfile)
router.put("/meals/:id",authorization(Role.PROVIDER),providerController.updateMeal)
router.delete("/meals/:id",authorization(Role.PROVIDER),providerController.deleteMeal)



export const providerRoutes = router;


import { Router } from "express";
import { getProviderController } from "./getProv.controller";

const router = Router();

router.get("/",getProviderController.getAllProviders)
router.get("/:id",getProviderController.getProvidersWithMenu)



export const getProviderRoutes = router;
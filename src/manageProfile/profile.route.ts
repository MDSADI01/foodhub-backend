import express from "express";
import { authorization } from "../middleware/authorization";

import { profileController } from "./profile.controller";
import { Role } from "../generated/enums";

const router = express.Router();

router.patch(
  "/",
  authorization(Role.CUSTOMER, Role.PROVIDER),
  profileController.updateProfile
);

export const profileRoute = router;

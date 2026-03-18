import express from "express";
import { authorization } from "../middleware/authorization";
import { Role } from "../../generated/prisma/enums";
import { profileController } from "./profile.controller";


const router = express.Router();


router.patch(
  "/profile",
  authorization(Role.CUSTOMER),
  profileController.updateProfile
);

export const profileRoute = router ;
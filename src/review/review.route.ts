import { authorization } from './../middleware/authorization';
import { Router } from "express";
import { reviewController } from "./review.controller";
import { Role } from '../../generated/prisma/enums';

const router = Router();


router.post("/",authorization(Role.CUSTOMER),reviewController.createReview)
router.get("/",reviewController.getAllReviews)
router.get("/own",authorization(Role.CUSTOMER),reviewController.getMyReviews)
router.put("/:id",authorization(Role.CUSTOMER),reviewController.updateReview)
router.delete("/:id",authorization(Role.CUSTOMER,Role.ADMIN),reviewController.deleteReview)



export const reviewRouter = router;
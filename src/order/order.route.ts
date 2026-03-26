import { authorization } from "./../middleware/authorization";
import { Router } from "express";
import { orderController } from "./order.controller";
import { Role } from "../generated/enums";

const router = Router();

router.post("/", authorization(Role.CUSTOMER), orderController.createOrder);
router.get(
  "/",
  authorization(Role.CUSTOMER),
  orderController.getCustomerOrders
);
router.get("/all", authorization(Role.ADMIN), orderController.getAllOrders);
router.get("/:id", authorization(Role.CUSTOMER), orderController.getOrderById);

export const orderRoutes = router;

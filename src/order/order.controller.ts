import { Request, Response } from "express";
import { orderService } from "./order.service";
import { prisma } from "../lib/prisma";

const createOrder = async (req: Request, res: Response) => {
  try {
    const customerId = req.user?.id as string;
    const result = await orderService.createOrder(customerId, req.body);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getCustomerOrders = async (req: Request, res: Response) => {
  try {
    const customerId = req.user?.id as string;

    const result = await orderService.getCustomerOrders(customerId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const customerId = req.user?.id as string;
    const id = req.params.id as string;

    const result = await orderService.getOrderById(customerId, id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { sortBy } = req.query;
    const result = await orderService.getAllOrders(sortBy as string);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const orderController = {
  createOrder,
  getCustomerOrders,
  getOrderById,
  getAllOrders,
};

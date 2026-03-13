import { Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await adminService.getAllUsers();
      res.status(200).json({ success: true, data: users });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };
  
  const updateUserStatus = async (req: Request, res: Response) => {
    try {
      const userId = req.params?.id as string;
      const { emailVerified } = req.body;
  
      if (typeof emailVerified !== "boolean") {
        return res.status(400).json({ success: false, message: "isActive must be boolean" });
      }
  
      const user = await adminService.updateUserStatus(userId, emailVerified);
      res.status(200).json({ success: true, data: user });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  };
  
  export const adminController = {
    getAllUsers,
    updateUserStatus
  };
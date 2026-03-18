import { Request, Response } from "express";
import { profileService } from "./profile.service";



 const updateProfile = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id as string; 
      const data = req.body;

      const { phone, address, image } = req.body;

      const updatedUser = await profileService.updateProfile(userId as string, data as any);

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    }
  }


export const profileController = {
 updateProfile
}
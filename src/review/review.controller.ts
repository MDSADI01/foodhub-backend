import { Request, Response } from "express";
import { reviewService } from "./review.service";


const createReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized",
      });
    }

  const result = await reviewService.createReview(userId,req.body)

  res.status(201).json({
    success: true,
    message: "Review created successfully",
    data: result,
  });

  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllReviews = async (req: Request, res: Response)=>{

 try {

    const result = await reviewService.getAllReviews();

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }


}

const getMyReviews = async (req: Request, res: Response)=>{

  try {
     
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized",
      });
    }
 
     const result = await reviewService.getMyReviews(userId);
 
     res.status(200).json({
       success: true,
       data: result
     });
   } catch (error: any) {
     res.status(400).json({
       success: false,
       message: error.message
     });
   }
 
 
 }



const updateReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string; 
    const reviewId = req.params.id as string;
    const payload = req.body ;

    const result = await reviewService.updateReview(
      userId,
      reviewId,
      payload
    );

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const role = req.user?.role as string;
    const reviewId = req.params.id as string;

  const result =  await reviewService.deleteReview(userId, reviewId,role);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const reviewController = {
  createReview,
  getAllReviews,
  getMyReviews,
  updateReview,
  deleteReview
};

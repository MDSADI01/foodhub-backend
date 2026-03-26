import { Request, Response } from "express";
import { categoryService } from "./categories.service";



 const createCategory = async (req: Request, res: Response) => {
  try {
    
    const result = await categoryService.createCategory(req.body as any)
    res.status(201).json({
        message: "Category created successfully",
        details: result  
     })

    
  } catch (err) {
    res.status(400).json({ error: "Category creation failed", details: err });
  }
};

const getAllCategory = async (req: Request, res: Response) => {
  try {
   const result = await categoryService.getAllCategories()
    res.json({ 
      message: "Category retrieved successfully",
      data:result 
    });
  } catch (err) {
    res.status(400).json({ error: "Delete failed", details: err });
  }
};




 const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.id as string;
  try {
   const result = await categoryService.deleteCategory(categoryId )
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Delete failed", details: err });
  }
};


export const categoryController = {
    createCategory,
    deleteCategory,
    getAllCategory
}
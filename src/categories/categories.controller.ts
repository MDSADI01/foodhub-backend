import { Request, Response } from "express";
import { categoryService } from "./categories.service";


// Create Category
 const createCategory = async (req: Request, res: Response) => {
  try {
    
    const result = await categoryService.createCategory(req.body as any)
    res.status(201).json({
        message: "Category created successfully",
        details: result  
     })

     console.log(result)
  } catch (err) {
    res.status(400).json({ error: "Category creation failed", details: err });
  }
};

// // Get All Categories
//  const getCategories = async (req: Request, res: Response) => {
//   const categories = await prisma.category.findMany();
//   res.json(categories);
// };


// // Update Category
//  const updateCategory = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { name, description } = req.body;
//   try {
//     const updated = await prisma.category.update({
//       where: { id },
//       data: { name, description },
//     });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ error: "Update failed", details: err });
//   }
// };

// // Delete Category
//  const deleteCategory = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     await prisma.category.delete({ where: { id } });
//     res.json({ message: "Category deleted successfully" });
//   } catch (err) {
//     res.status(400).json({ error: "Delete failed", details: err });
//   }
// };


export const categoryController = {
    createCategory,
    // getCategories
}
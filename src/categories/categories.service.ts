import { Category } from '../../generated/prisma/client';
import { prisma } from '../../lib/prisma';




const createCategory=async(payload:Category)=>{

 const result = await prisma.category.create({
    data:{
        name:payload.name,
        description:payload.description
    }
 })

 return result;


}

const getAllCategories = async () => {
    const result = await prisma.category.findMany();
  
    return result;
  };

const deleteCategory = async (categoryId:string) => {
    const category = await prisma.category.findUnique({
      where: { 
        id:categoryId
       },
    });
  
    if (!category) {
      throw new Error("Category not found");
    }
  
    
  
   const result = await prisma.category.delete({
      where: { id: categoryId },
    });
  
    return result;
  };


export const categoryService = {
    createCategory,
    getAllCategories,
    deleteCategory
}
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


export const categoryService = {
    createCategory
}
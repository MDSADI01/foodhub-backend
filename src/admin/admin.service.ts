import { prisma } from "../../lib/prisma";

const getAllUsers = async ()=>{

 const result = await prisma.user.findMany({
    where:{
        role:{
            not:"ADMIN"
        }
    }
 });

 return result;

}


const updateUserStatus = async (userId: string,isActive: boolean)=>{

    if(!userId){
        throw new Error("User ID is required")
    }

    const result = await prisma.user.update({
        where:{
            id: userId
        },
        data:{
            isActive
        }
    })
    return result;
   
   }


   export const adminService = {
    getAllUsers,
    updateUserStatus
   }
import { prisma } from "../../lib/prisma";

const getAllUsers = async ()=>{

 const result = await prisma.user.findMany();

 return result;

}


const updateUserStatus = async (userId: string,emailVerified: boolean)=>{

    if(!userId){
        throw new Error("User ID is required")
    }

    const result = await prisma.user.update({
        where:{
            id: userId
        },
        data:{
            emailVerified
        }
    })
    return result;
   
   }


   export const adminService = {
    getAllUsers,
    updateUserStatus
   }
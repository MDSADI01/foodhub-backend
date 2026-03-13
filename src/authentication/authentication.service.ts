// import { Role } from "../../generated/prisma/enums";
// import { auth } from "../../lib/auth";
// import { prisma } from "../../lib/prisma";

// const createUser = async (payload: {
//   name: string;
//   email: string;
//   password: string;
//   role: Role;
// }) => {

//   const existingUser = await prisma.user.findUnique({
//     where: {
//       email: payload.email,
//     },
//   });

//   if (existingUser) {
//     throw new Error("User already exists");
//   }


//   const result = await auth.api.signUpEmail({
//     body: {
//       name: payload.name,
//       email: payload.email,
//       password: payload.password,
//       role:payload.role
//     },
//   });

//   if (!result?.user) {
//     throw new Error("User SignUp failed");
//   }


//   return result
// };


// const loginUser = async (email: string, password: string)=>{

// const result = await auth.api.signInEmail({
//   body:{
//     email: email,
//     password: password
//   },
//   returnHeaders:true
// })



// if(!result?.response?.user){
//   throw new Error("User SignIn Failed");
// }






// return result;

// }

// const getCurrentUser = async (userId: string)=>{

//  if(!userId){
//   throw new Error("Their is no active User")
//  }
  
//   const result = await prisma.user.findFirst({
//     where:{
//       id:userId
//     }
//   })
  
  
  
//   return result;
  
//   }

// export const userAuthService = {
//   createUser,
//   loginUser,
//   getCurrentUser
// };

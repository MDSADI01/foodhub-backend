// import { Request, Response } from "express"
// import { userAuthService } from "./authentication.service"


// const createUser = async(req:Request,res:Response)=>{
    
//     try{
//         const result = await userAuthService.createUser(req.body as any)

//           res.status(201).json({
//            message: "User created successfully",
//            details: result  
//         })
        
        
     
//     }catch(err){
//            res.status(400).json({
//             error: "User creation failed",
//             details: err
//            })
//     }
// }

// const loginUser = async(req:Request, res:Response)=>{
//     try{
//         const { email,password } = req.body;

//         const result = await userAuthService.loginUser(email,password);

//         const cookie = result.headers.get("set-cookie");

//         if(cookie){
//            res.setHeader("Set-Cookie",cookie)
//         }


//         res.status(201).json({
//             message: "User login successfully",
//             details: result  
//          })

        
  
    
//     }catch(err){
//         res.status(401).json({
//          error: "User login failed",
//          details: err
//         })
//  }
// }



// const getCurrentUser = async(req:Request, res:Response)=>{
//     try{
        
//         const userId = req.user?.id as string;

//         const result = await userAuthService.getCurrentUser(userId);


//         res.status(201).json({
//             message: "User retrieved successfully",
//             details: result  
//          })

        
  
    
//     }catch(err){
//         res.status(401).json({
//          error: "User not found",
//          details: err
//         })
//  }
// }


// export const userAuthController = {
//     createUser,
//     loginUser,
//     getCurrentUser
// }
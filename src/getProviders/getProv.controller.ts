import { Request, Response } from "express";
import { getProviderService } from "./getProv.service";

const getAllProviders = async (req: Request, res: Response)=>{

 try {

    const result = await getProviderService.getAllProviders();

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




const getProvidersWithMenu = async (req: Request, res: Response)=>{

    try {
       
       const providerId = req.params.id as string;

       const result = await getProviderService.getProviderWithMenu(providerId);
   
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

   export const getProviderController = {
   getAllProviders,
   getProvidersWithMenu
   }

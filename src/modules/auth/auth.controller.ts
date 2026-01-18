import { Request, Response } from "express";
import { authservice } from "./auth.service";

const loginuser = async (req:Request,res: Response) =>
{
    const {email, password} = req.body;

      try
      {
           const result =  await authservice.loginuser(email, password);
    
    
           res.status(200).json
          ({
            success:true,
            message:"User registered successfully",
            data: result
          })
           
      }
      catch(error:any)
      {
          res.status(500).json
          ({
            success:false,
            message:error.message
          })
      }


}

export  const authcontroler =
{
    loginuser,
}
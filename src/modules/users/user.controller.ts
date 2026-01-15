import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userservice } from "./user.service";

const createuser = async (req:Request, res:Response) => {
  const {name,email,password,phone,role} = req.body;

  try
  {
       const result = await userservice.createuser(name,email,password,phone,role);


       res.status(201).json
      ({
        success:true,
        message:"User registered successfully",
        data: result.rows[0]
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

};

const getuser = async (req:Request, res:Response) => {
 
  try
  {
      const result = await userservice.getuser();  
       res.status(201).json
      ({
        success:true,
        message:"User registered successfully",
        data: result.rows
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

};

const getsingleuser = async (req:Request, res:Response) => {
 
  try
  {
      const result = await userservice.getsingleuser(req.params.id) ;
      
      if(result.rows.length ===0)
      {
        res.status(404).json
      ({
        success:false,
        message: "Users Not Found"
      })
      }
        
      else
      {
        res.status(404).json
      ({
        success:true,
        message: "Users Fetched Successfully",
        data: result.rows[0]
      })
      }
       
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

const updateuser =  async (req:Request, res:Response) => {

    const {name,email,password,phone,role} = req.body;
 
  try
  {
      const result = await userservice.updateuser(name,email,password,phone,role,req.params.id) ;
      
      if(result.rows.length ===0)
      {
        res.status(404).json
      ({
        success:false,
        message: "Users Not Found"
      })
      }
        
      else
      {
        res.status(200).json
      ({
        success:true,
        message: "Users updated Successfully",
        data: result.rows[0]
      })
      }
       
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

const deleteuser = async (req:Request, res:Response) => {
 
  try
  {
      const result = await userservice.deleteuser(req.params.id);
      
      if(result.rowCount ===0)
      {
        res.status(404).json
      ({
        success:false,
        message: "Users Not Found"
      })
      }
        
      else
      {
        res.status(404).json
      ({
        success:true,
        message: "Users deleted Successfully",
        data: null
      })
      }
       
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




export const usercontrollers = 
{
    createuser,
    getuser,
    getsingleuser,
    updateuser,
    deleteuser
}
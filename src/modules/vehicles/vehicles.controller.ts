import { Request, Response } from "express";
import { pool } from "../../config/db";
import { vehicleservice } from "./vehicles.service";

const createvehicles = async (req:Request, res:Response) => {
  const {vehicle_name,type,registration_number,daily_rent_price,availability_status} = req.body;

  try
  {
       const result = await vehicleservice.createvehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) ;


       res.status(201).json
      ({
        success:true,
        message:"Vehicle created successfully",
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

}

const getvehicles = async (req:Request, res:Response) => {
 
  try
  {
      const result = await vehicleservice.gatevehicles() ; 
       res.status(201).json
      ({
        success:true,
        message:"User found  successfully",
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

}

const getsinglevehicles = async (req:Request, res:Response) => {
 
  try
  {
      const result = await vehicleservice.getsinglevehicles(req.params.id);
      
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

const updatevehicles = async (req:Request, res:Response) => {

    const {vehicle_name,type,registration_number,daily_rent_price,availability_status} = req.body;
 
  try
  {
      const result = await vehicleservice.updatevehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status,req.params.id)  ;
      
      if(result.rows.length ===0)
      {
        res.status(404).json
      ({
        success:false,
        message: "Vehicles Not Found"
      })
      }
        
      else
      {
        res.status(200).json
      ({
        success:true,
        message: "Vehicles updated Successfully",
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

const deletevehicles =  async (req:Request, res:Response) => {
 
  try
  {
      const result = await vehicleservice.deletevehicles(req.params.id) ;
      
      if(result.rowCount ===0)
      {
        res.status(404).json
      ({
        success:false,
        message: "Vehicles Not Found"
      })
      }
        
      else
      {
        res.status(404).json
      ({
        success:true,
        message: "Vehicles deleted Successfully",
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



export const vehiclestrollers = 
{ 
     createvehicles,
     getvehicles,
     getsinglevehicles,
     updatevehicles,
     deletevehicles
}
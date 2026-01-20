import express, { NextFunction, Request, Response } from "express";  
import {Pool} from "pg";
import config from "./config";
import mydb, { pool } from "./config/db";
import logger from "./middleware/logger";
import { UNSAFE_createClientRoutes } from "react-router-dom";
import { userRoutes } from "./modules/users/user.routes";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes";
 import bookingRoutes from './modules/bookings/booking.routes';
import { authRoutes } from "./modules/auth/auth.routes";
const app = express();
 
app.use(express.json());
 
mydb();

app.get('/',logger, (req:Request, res:Response) => {
  res.send('Hello World!,My name is Toufique Hossain')
})
app.use("/api/v1",userRoutes) 
app.use("/api/v1/vehicles",vehiclesRoutes)  
   app.use("/api/v1/bookings",bookingRoutes);
 
app.use("/api/v1/auth", authRoutes)
  
app.use((req,res) =>
{
  res.status(404).json
  ({
    success: false,
    message: " Route not found",
    path:req.path,
  });
})

export default app;

 

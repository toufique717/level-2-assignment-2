import express, { NextFunction, Request, Response } from "express";  
import {Pool} from "pg";
import config from "./config";
import mydb, { pool } from "./config/db";
import logger from "./middleware/logger";
import { UNSAFE_createClientRoutes } from "react-router-dom";
import { userRoutes } from "./modules/users/user.routes";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes";
 import bookingRoutes from './modules/bookings/booking.routes';
const app = express();
const port = config.port;
 
app.use(express.json());
 
mydb();

//logger middlewere
app.get('/',logger, (req:Request, res:Response) => {
  res.send('Hello World!,My name is Toufique Hossain')
})


//users post
app.use("/api/v1/auth/signup",userRoutes) 
//single user get 
app.get('/api/v1/auth/signup/:id',userRoutes )
//users update
app.put('/api/v1/auth/signup/:id',userRoutes )
//users delete
app.delete('/api/v1/auth/signup/:id',userRoutes )

 //......................vehicles--crud..........................
app.use("/api/v1/vehicles",vehiclesRoutes)  
//get vehicles
app.get('/api/v1/vehicles',vehiclesRoutes );
//get single vehicles
app.get('/api/v1/vehicles/:id',vehiclesRoutes);
// update vehicles
app.put('/api/v1/vehicles/:id',vehiclesRoutes)
//delete a vehicles
app.delete('/api/v1/vehicles/:id',vehiclesRoutes)

//....................Booking Crud ..............................
//booking post
 app.use("/api/v1/bookings",bookingRoutes);
//booking get 
app.get("api/v1/bookings",bookingRoutes)
// single booking get
//app.get("/api/v1/bookings/:id",bookingRoutes)
// app.get('/api/v1/bookings/:id', async (req:Request, res:Response) => {
 
//   try
//   {
//       const result = await pool.query(`SELECT * FROM  Bookings WHERE id = $1`,[req.params.id]);
      
//       if(result.rows.length ===0)
//       {
//         res.status(404).json
//       ({
//         success:false,
//         message: "Booking Not Found"
//       })
//       }
        
//       else
//       {
//         res.status(404).json
//       ({
//         success:true,
//         message: "Bookinh  Fetched Successfully",
//         data: result.rows[0]
//       })
//       }
       
//   }
//   catch(error:any)
//   {
//       res.status(500).json
//       ({
//         success:false,
//         message:error.message
//       })
//   }

// })
//booking update
 // Booking Update (PUT)
app.put('/api/v1/bookings/:id', async (req: Request, res: Response) => {
  const { role, action } = req.body; // role = 'customer'|'admin'|'system', action='cancel'|'return'
  const bookingId = req.params.id; // fix here

  try {
    // 1️⃣ Fetch the booking and vehicle info
    const bookingResult = await pool.query(
      `SELECT b.*, v.availability_status, v.id as vehicle_id 
       FROM Bookings b 
       JOIN Vehicles v ON b.vehicle_id = v.id 
       WHERE b.id = $1`,
      [bookingId]
    );

    if (bookingResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const booking = bookingResult.rows[0];
    const today = new Date();
    const rentStart = new Date(booking.rent_start_date);

    // 2️⃣ Role-based logic
    if (role === 'customer') {
      // Customer can cancel only before start date
      if (action !== 'cancel') {
        return res.status(400).json({ success: false, message: "Customer can only cancel" });
      }
      if (today >= rentStart) {
        return res.status(400).json({ success: false, message: "Cannot cancel after start date" });
      }

      // Update booking to cancelled
      await pool.query(
        `UPDATE Bookings SET status='cancelled', updated_at=CURRENT_TIMESTAMP WHERE id=$1`,
        [bookingId]
      );

      // Make vehicle available again
      await pool.query(
        `UPDATE Vehicles SET availability_status='available' WHERE id=$1`,
        [booking.vehicle_id]
      );

      return res.status(200).json({ success: true, message: "Booking cancelled successfully" });
    } else if (role === 'admin') {
      // Admin can mark as returned
      if (action !== 'return') {
        return res.status(400).json({ success: false, message: "Admin can only mark as returned" });
      }

      await pool.query(
        `UPDATE Bookings SET status='returned', updated_at=CURRENT_TIMESTAMP WHERE id=$1`,
        [bookingId]
      );

      // Update vehicle availability
      await pool.query(
        `UPDATE Vehicles SET availability_status='available' WHERE id=$1`,
        [booking.vehicle_id]
      );

      return res.status(200).json({ success: true, message: "Booking marked as returned" });
    } else if (role === 'system') {
      // Auto return if period ended
      const rentEnd = new Date(booking.rent_end_date);
      if (today <= rentEnd) {
        return res.status(400).json({ success: false, message: "Booking period not ended yet" });
      }

      await pool.query(
        `UPDATE Bookings SET status='returned', updated_at=CURRENT_TIMESTAMP WHERE id=$1`,
        [bookingId]
      );

      // Update vehicle availability
      await pool.query(
        `UPDATE Vehicles SET availability_status='available' WHERE id=$1`,
        [booking.vehicle_id]
      );

      return res.status(200).json({ success: true, message: "Booking auto-marked as returned" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});
//booking delete




  



app.use((req,res) =>
{
  res.status(404).json
  ({
    success: false,
    message: " Route not found",
    path:req.path,
  });
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

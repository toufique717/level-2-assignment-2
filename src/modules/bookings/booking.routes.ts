import express from 'express';
 
import { vehiclescontrollers, } from './booking.controllers';
//import { getAllBookings } from './booking.controllers';

const router = express.Router();

router.post("/",vehiclescontrollers.createBooking);
router.get("/",vehiclescontrollers.getAllBookings);
router.get("/:id" ,vehiclescontrollers.getSingleBooking);
router.delete('/:id', vehiclescontrollers.deleteBooking);
router.put('/:id', vehiclescontrollers.updateBooking);




export default router;

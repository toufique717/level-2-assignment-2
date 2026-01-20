import express from 'express';
 
import { vehiclescontrollers, } from './booking.controllers';
import auth from '../../middleware/auth';

const router = express.Router();

router.post("/",auth("customer","admin"),vehiclescontrollers.createBooking);
router.get("/",auth("customer","admin"),vehiclescontrollers.getAllBookings);
router.get("/:bookingId" ,auth("customer","admin"),vehiclescontrollers.getSingleBooking);
router.delete('/:bookingId',auth("customer","admin"), vehiclescontrollers.deleteBooking);
router.put('/:bookingId',auth("customer","admin"), vehiclescontrollers.updateBooking);


export default router;

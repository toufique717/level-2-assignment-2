import express from 'express';
 
import { vehiclescontrollers } from './booking.controllers';

const router = express.Router();

router.post('/api/v1/bookings',vehiclescontrollers.createBooking);

export default router;

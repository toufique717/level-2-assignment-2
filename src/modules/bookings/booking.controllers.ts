import { Request, Response } from 'express';
import * as bookingService from './booking.service';

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createBooking(req.body);

    res.status(201).json({
      success: true,
      message: "Booking done",
      data: result
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

 const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await bookingService.getAllBookings();

    res.status(200).json({
      success: true,
      message: "All bookings fetched successfully",
      data: bookings
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

 const getSingleBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const booking = await bookingService.getSingleBooking(id);

    res.status(200).json({
      success: true,
      message: "Booking fetched successfully",
      data: booking
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

const deleteBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await bookingService.deleteBooking(id);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully"
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await bookingService.updateBooking(id, req.body);

    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};



export const vehiclescontrollers = 
{
     createBooking,
     getAllBookings,
     getSingleBooking,
     deleteBooking,
     updateBooking
}


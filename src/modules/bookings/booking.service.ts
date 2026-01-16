import { pool } from "../../config/db";


export const createBooking = async (data: any) => {
  const {
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    status
  } = data;

  const vehicleResult = await pool.query(
    'SELECT daily_rent_price, availability_status FROM Vehicles WHERE id=$1',
    [vehicle_id]
  );

  if (vehicleResult.rows.length === 0) {
    throw new Error('Vehicle not found');
  }

  const vehicle = vehicleResult.rows[0];
  if (vehicle.availability_status === 'booked') {
    throw new Error('Vehicle is booked now');
  }

  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);

  if (end < start) {
    throw new Error('Wrong date input');
  }

  const days =
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const total_price = vehicle.daily_rent_price * days;

  const allowedStatuses = ['active', 'cancelled', 'returned'];
  if (!allowedStatuses.includes(status)) {
    throw new Error('You entered wrong status');
  }

  const bookingResult = await pool.query(
    `INSERT INTO Bookings
     (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status]
  );

  await pool.query(
    `UPDATE Vehicles SET availability_status='booked' WHERE id=$1`,
    [vehicle_id]
  );

  return bookingResult.rows[0];
};

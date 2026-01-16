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

export const getAllBookings = async () => {
  const result = await pool.query(
    `SELECT * FROM Bookings ORDER BY id DESC`
  );

  return result.rows;
};


export const getSingleBooking = async (id: any) => {
  const result = await pool.query(
    `SELECT * FROM Bookings WHERE id = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error('Booking not found');
  }

  return result.rows[0];
};

export const deleteBooking = async (id: any) => {
  // 1️⃣ Check booking exists
  const bookingResult = await pool.query(
    `SELECT vehicle_id FROM Bookings WHERE id = $1`,
    [id]
  );

  if (bookingResult.rows.length === 0) {
    throw new Error('Booking not found');
  }

  const vehicleId = bookingResult.rows[0].vehicle_id;

  // 2️⃣ Delete booking
  await pool.query(
    `DELETE FROM Bookings WHERE id = $1`,
    [id]
  );

  // 3️⃣ Make vehicle available again
  await pool.query(
    `UPDATE Vehicles SET availability_status = 'available' WHERE id = $1`,
    [vehicleId]
  );

  return true;
};

export const updateBooking = async (id: any, data: any) => {
  const { role, action } = data;

  // Fetch booking with vehicle info
  const bookingResult = await pool.query(
    `SELECT b.*, v.id AS vehicle_id
     FROM Bookings b
     JOIN Vehicles v ON b.vehicle_id = v.id
     WHERE b.id = $1`,
    [id]
  );

  if (!bookingResult.rows.length) {
    throw new Error('Booking not found');
  }

  const booking = bookingResult.rows[0];
  const today = new Date();
  const rentStart = new Date(booking.rent_start_date);
  const rentEnd = new Date(booking.rent_end_date);

  // Generic function to update booking and vehicle status
  const updateStatus = async (bookingStatus: string, vehicleStatus: string) => {
    await pool.query(
      `UPDATE Bookings SET status=$1, updated_at=CURRENT_TIMESTAMP WHERE id=$2`,
      [bookingStatus, id]
    );

    await pool.query(
      `UPDATE Vehicles SET availability_status=$1 WHERE id=$2`,
      [vehicleStatus, booking.vehicle_id]
    );
  };

  // Role-based actions
  const roleActions: Record<string, (action: string) => Promise<any>> = {
    customer: async (action) => {
      if (action !== 'cancel') throw new Error('Customer can only cancel booking');
      if (today >= rentStart) throw new Error('Cannot cancel after start date');

      await updateStatus('cancelled', 'available');
      return { message: 'Booking cancelled successfully' };
    },

    admin: async (action) => {
      if (action !== 'return') throw new Error('Admin can only mark as returned');

      await updateStatus('returned', 'available');
      return { message: 'Booking marked as returned' };
    },

    system: async (action) => {
      if (today <= rentEnd) throw new Error('Booking period not ended yet');

      await updateStatus('returned', 'available');
      return { message: 'Booking auto-marked as returned' };
    },
  };

  if (!roleActions[role]) {
    throw new Error('Invalid role');
  }

  return roleActions[role](action); 
}
 
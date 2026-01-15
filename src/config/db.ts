import {Pool} from "pg";
import config from ".";
export const pool = new Pool
({
    connectionString: `${config.connection_str}`
})

const mydb = async() =>
{
    await pool.query
    (`
      CREATE TABLE IF NOT EXISTS  Users
      (
         id SERIAL PRIMARY KEY,
         name VARCHAR(100) NOT NULL,
         email VARCHAR(200) UNIQUE NOT NULL
         CHECK(email = LOWER(email)),
         password VARCHAR(50) NOT NULL
         CHECK(LENGTH(password) >= 6),
         phone VARCHAR(20) NOT NULL,
         role VARCHAR(50) NOT NULL
         CHECK(role IN ('admin' , 'customer')),
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
         
      )
    `);



     await pool.query
    (`
      CREATE TABLE IF NOT EXISTS Vehicles
      (
         id SERIAL PRIMARY KEY,
         vehicle_name VARCHAR(100) NOT NULL,
         type VARCHAR(50) NOT NULL
         CHECK(type IN ('car', 'bike', 'van','SUV')),
         registration_number VARCHAR(50) UNIQUE NOT NULL,
         daily_rent_price INT  NOT NULL CHECK ( daily_rent_price > 0 ),
         availability_status VARCHAR(10) NOT NULL 
         CHECK(availability_status IN ('available' ,'booked')),
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
         
      )
    `);


     await pool.query
    (`
      CREATE TABLE IF NOT EXISTS Bookings
      (
         id SERIAL PRIMARY KEY,
         customer_id INT REFERENCES Users(id) ON DELETE CASCADE,
         vehicle_id INT REFERENCES  Vehicles(id) ON DELETE CASCADE,
         rent_start_date DATE NOT NULL,
         rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date) ,
         total_price INT  NOT NULL CHECK ( total_price > 0 ),
         status VARCHAR(10) NOT NULL 
         CHECK( status IN ('active', 'cancelled', 'returned' )),

         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
         
      )
    `);
}

export default mydb;

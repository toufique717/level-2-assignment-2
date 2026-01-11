import express, { Request, Response } from "express";  
import {Pool} from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env")});
 
const app = express()
const port = 5000
app.use(express.json());
const pool = new Pool
({
    connectionString: `${process.env.CONNECTION_STR}`
})

const mydb = async() =>
{
    await pool.query
    (`
      CREATE TABLE IF NOT EXISTS users
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
         customer_id INT REFERENCES users(id) ON DELETE CASCADE,
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

mydb();

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!,My name is Toufique Hossain')
})

app.post('/', (req:Request, res:Response) => {
  console.log(req.body);

  res.status(201).json
  ({
    success: true,
    message: " API is working",
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

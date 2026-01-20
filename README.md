                                                                                            Vehicle Rental System API

## 🔗 Live URL
 https://level-2-assignment-2-ashy.vercel.app/

 Project Overview :
A backend API for a vehicle rental management system that provides secure, role-based access to manage vehicles, users, and bookings. The system supports vehicle availability tracking, rental cost calculation, and authentication using JWT.

---

 Features :
-  Authentication & Authorization (JWT, Role-based access)
-  User Management (Admin & Customer roles)
-  Vehicle Management with availability tracking
-  Booking Management with automatic price calculation
-  Vehicle status updates on booking and return
-  Modular architecture (routes, controllers, services)
-  PostgreSQL relational database integration

---

 Technology Stack:
- **Backend:** Node.js, TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JSON Web Token (JWT)
- **Security:** bcrypt (password hashing)

---

 Code Structure
The project follows a **modular pattern** with clear separation of concerns:

src/
├── modules/
│ ├── auth/
│ │ ├── auth.route.ts
│ │ ├── auth.controller.ts
│ │ └── auth.service.ts
│ ├── users/
│ ├── vehicles/
│ └── bookings/
├── middlewares/
├── utils/
├── config/
└── app.ts



Each module contains:
- **Route**: API endpoints
- **Controller**: Request/response handling
- **Service**: Business logic

---

//// Database Tables

 Users
 
 id : Auto-generated 
 name : Required 
 email : Required, unique, lowercase 
 password : Required, min 6 characters 
 phone : Required 
 role : `admin` or `customer` 

 Vehicles
 
 id : Auto-generated 
 vehicle_name : Required |
 type : `car`, `bike`, `van`, `SUV` 
 registration_number : Required, unique 
 daily_rent_price : Required, positive 
 availability_status : `available` or `booked` 

Bookings:
 
 id | Auto-generated 
 customer_id : FK → Users 
 vehicle_id : FK → Vehicles 
 rent_start_date : Required 
 rent_end_date : Must be after start date 
 total_price : Calculated 
 status : `active`, `cancelled`, `returned` 

---

 Authentication & Authorization:
- Passwords are hashed using **bcrypt**
- Login returns a **JWT token**
- Protected routes require:



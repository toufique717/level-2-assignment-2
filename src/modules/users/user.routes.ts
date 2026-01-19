 
import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { usercontrollers } from "./user.controller";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/auth/signup",usercontrollers.createuser );
 router.get("/users",logger,auth("admin"),usercontrollers.getuser);

 //router.get("/users",logger,usercontrollers.getuser);
router.get("/:id",usercontrollers.getsingleuser);
router.put("/:id",auth("admin","customer"),usercontrollers.updateuser);
router.delete("/:id",usercontrollers.deleteuser);



export const userRoutes = router;
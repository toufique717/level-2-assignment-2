 
import express, { Request, Response } from "express";
import { usercontrollers } from "./user.controller";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/auth/signup",usercontrollers.createuser );
 router.get("/users",logger,auth("admin"),usercontrollers.getuser);

router.get("/users/:id",auth("admin"),usercontrollers.getsingleuser);
router.put("/users/:userId",auth("admin","customer"),usercontrollers.updateuser);
router.delete("/users/:userId",auth("admin","customer"),usercontrollers.deleteuser);

export const userRoutes = router;
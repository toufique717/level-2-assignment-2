 
import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { usercontrollers } from "./user.controller";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/",usercontrollers.createuser );
router.get("/",logger,auth("admin"),usercontrollers.getuser);
router.get("/:id",usercontrollers.getsingleuser);
router.put("/:id",usercontrollers.updateuser);
router.delete("/:id",usercontrollers.deleteuser);



export const userRoutes = router;
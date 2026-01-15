import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { usercontrollers } from "./user.controller";

const router = express.Router();

router.post("/",usercontrollers.createuser );
router.get("/",usercontrollers.getuser);
router.get("/:id",usercontrollers.getsingleuser);
router.put("/:id",usercontrollers.updateuser);
router.delete("/:id",usercontrollers.deleteuser);



export const userRoutes = router;
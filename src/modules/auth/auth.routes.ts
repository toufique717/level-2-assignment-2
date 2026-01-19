import express, { Request, Response } from "express";
import { authcontroler } from "./auth.controller";
 
 

const router = express.Router();

 
router.post("/signin",authcontroler.loginuser )


export const authRoutes = router;
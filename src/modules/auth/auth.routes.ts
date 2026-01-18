import express, { Request, Response } from "express";
import { authcontroler } from "./auth.controller";
 
 

const router = express.Router();

 
router.post("/login",authcontroler.loginuser )


export const authRoutes = router;
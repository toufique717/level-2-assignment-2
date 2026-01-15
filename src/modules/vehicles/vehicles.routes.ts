import express, { Request, Response } from "express";
import { vehicleservice } from "./vehicles.service";
import { vehiclestrollers } from "./vehicles.controller";


const router = express.Router();


router.post("/",vehiclestrollers.createvehicles)
router.get("/",vehiclestrollers.getvehicles)
router.get("/:id",vehiclestrollers.getsinglevehicles)
router.put("/:id",vehiclestrollers.updatevehicles)
router.delete("/:id",vehiclestrollers.deletevehicles)


export const vehiclesRoutes = router;
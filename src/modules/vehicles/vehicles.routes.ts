import express, { Request, Response } from "express";
import { vehiclestrollers } from "./vehicles.controller";
import auth from "../../middleware/auth";


const router = express.Router();


router.post("/",auth("admin"),vehiclestrollers.createvehicles)
router.get("/",vehiclestrollers.getvehicles)
router.get("/:vehicleId",vehiclestrollers.getsinglevehicles)
router.put("/:vehicleId",auth("admin"),vehiclestrollers.updatevehicles)
router.delete("/:vehicleId",auth("admin"),vehiclestrollers.deletevehicles)


export const vehiclesRoutes = router;
import { Router } from "express";
import carController from "../controllers/carsController";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware";
import { carSchema } from "../schemas/carSchema";

const carsRouter = Router();

carsRouter.get("/cars", carController.getAllCars);
carsRouter.get("/cars/:carId", carController.getSpecificCar);
carsRouter.post("/cars", validateSchemaMiddleware(carSchema), carController.createCar);
carsRouter.delete("/cars/:carId", carController.deleteCar);

export default carsRouter;
import { Router } from "express";
import carsRouter from "./carsRouter";

const router = Router();

router.use(carsRouter);

export default router;
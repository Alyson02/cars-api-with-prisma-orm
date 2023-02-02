import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import carsRouter from "./routes/carsRouter"
import handleErrorsMiddleware from "./middlewares/errorHandlerMiddleware";
dotenv.config();

const app = express();
app.use(json());
app.use(carsRouter);
app.use(handleErrorsMiddleware);

export default app;
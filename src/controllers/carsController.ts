import httpStatus from "http-status";

import { Request, Response } from "express";
import carService from "../services/carService.js";
import { cars } from "@prisma/client";

async function getAllCars(req: Request, res: Response) {
  try {
    const cars = await carService.getCars();
    res.send(cars);
  } catch (e) {
    console.log(e);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function getSpecificCar(req: Request, res: Response) {
  const carId = parseInt(req.params.carId);
  try {
    const car = await carService.getCar(carId);
    res.send(car);
  } catch (e) {
    if (e.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

async function createCar(req: Request, res: Response) {
  const car = req.body as Partial<cars>;

  try {
    await carService.createCar(car);
    res.sendStatus(httpStatus.CREATED);
  } catch (e) {
    console.log(e);
    if (e.name === "ConflictError") {
      return res.sendStatus(httpStatus.CONFLICT);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function deleteCar(req: Request, res: Response) {
  const carId = parseInt(req.params.carId);

  try {
    await carService.deleteCar(carId);
    res.send(httpStatus.OK);
  } catch (e) {
    console.log(e);
    if (e.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const carController = {
  getAllCars,
  getSpecificCar,
  createCar,
  deleteCar,
};

export default carController;

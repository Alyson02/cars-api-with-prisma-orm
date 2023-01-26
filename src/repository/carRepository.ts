import { cars } from "@prisma/client";
import db from "../config/database.js";

async function getCars() {
  return await db.cars.findMany();
}

async function getCar(id: number) {
  return await db.cars.findFirst({ where: { id: id } });
}

async function getCarWithLicensePlate(licensePlate: string) {
  return await db.cars.findFirst({ where: { licensePlate: licensePlate } });
}

async function createCar(car: Partial<cars>) {
  await db.cars.create({ data: car as cars });
}

async function deleteCar(id: number) {
  await db.cars.delete({ where: { id: id } });
}

const carRepository = {
  getCar,
  getCarWithLicensePlate,
  getCars,
  createCar,
  deleteCar,
};

export default carRepository;

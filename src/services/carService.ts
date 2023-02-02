import notFoundError from "../errors/notFoundError";
import conflictError from "../errors/conflictError";
import carRepository from "../repository/carRepository";
import { cars } from "@prisma/client";

async function getCars() {
  const cars = await carRepository.getCars();
  return cars;
}

async function getCar(id: number) {
  const car = await carRepository.getCar(id);
  if (!car) {
    throw notFoundError();
  }

  return car;
}

async function createCar(car: Partial<cars>) {
  const carDb = await carRepository.getCarWithLicensePlate(car.licensePlate);
  if (carDb) {
    throw conflictError(
      `Car with license plate ${car.licensePlate} already registered.`
    );
  }

  await carRepository.createCar(car);
}

async function deleteCar(id: number) {
  await getCar(id);
  await carRepository.deleteCar(id);
}

const carService = {
  getCars,
  getCar,
  createCar,
  deleteCar,
};

export default carService;

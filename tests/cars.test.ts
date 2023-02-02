import { cars } from "@prisma/client";
import { date, number, string } from "joi";
import supertest from "supertest";
import app from "../src";

const server = supertest(app);

describe("cars basic tests", () => {

    it("specif cars return 200", async () => {
        const result = await server.get("/cars");
        expect(result.statusCode).toEqual(200);
    })

    it("specif cars body", async () => {
        const result = await server.get("/cars/1");
        expect(result.body).toEqual({
            color: expect.any(String),
            createAt: expect.any(String),
            id: expect.any(Number),
            licensePlate: expect.any(String),
            model: expect.any(String),
            year: expect.any(String)
        });
    })

    it("when create car that already exists ", async () => {
        const car: Omit<cars, "id" | "createAt"> = {
            model: "civic",
            licensePlate: "7777777",
            year: "2020",
            color: "red"
        }

        await server.post("/cars").send(car);

        const result = await server.post("/cars").send(car);

        expect(result.statusCode).toEqual(409);
    })

    it("when body is invalid", async () => {
        const car: Omit<cars, "id" | "createAt"> = {
            model: "civic",
            licensePlate: "77777777777",
            year: "2020",
            color: "red"
        }

        const result = await server.post("/cars").send(car);

        expect(result.statusCode).toEqual(422);
    })
});
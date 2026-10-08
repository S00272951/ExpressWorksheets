import request from "supertest";
import { app } from "../../src/app";

const newCar = {
    make: "Toyota",
    model: "Corolla",
    year: 2015
};

let carId = "";

describe('GET /cars', () => {
    it('returns all cars', async () => {
        const response = await request(app)
            .get('/api/v1/cars');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('Car create, read, update, delete', () => {
    it('creates a car', async () => {
        const response = await request(app)
            .post('/api/v1/cars')
            .set('x-api-key', 'test-key')
            .send(newCar);

        expect(response.status).toBe(201);
        expect(response.body.make).toBe("Toyota");
        expect(response.body.model).toBe("Corolla");
        carId = response.body._id;
    });

    it('gets the car by id', async () => {
        const response = await request(app)
            .get(`/api/v1/cars/${carId}`);

        expect(response.status).toBe(200);
        expect(response.body._id).toBe(carId);
        expect(response.body.make).toBe("Toyota");
    });

      it('updates the car', async () => {
        const response = await request(app)
            .put(`/api/v1/cars/${carId}`)
            .send({ ...newCar, model: "Yaris" });

        expect(response.status).toBe(200);
    });

    it('shows the updated car', async () => {
        const response = await request(app)
            .get(`/api/v1/cars/${carId}`);

        expect(response.status).toBe(200);
        expect(response.body.model).toBe("Yaris");
    });

    it('deletes the car', async () => {
        const response = await request(app)
            .delete(`/api/v1/cars/${carId}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Car deleted");
    });

    it('cannot find the deleted car', async () => {
        const response = await request(app)
            .get(`/api/v1/cars/${carId}`);

        expect(response.status).toBe(404);
    });

    it('cannot delete it again', async () => {
        const response = await request(app)
            .delete(`/api/v1/cars/${carId}`);

        expect(response.status).toBe(404);
    });

    it('returns 400 for a bad id on delete', async () => {
        const response = await request(app)
            .delete('/api/v1/cars/123');

        expect(response.status).toBe(400);
    });
});
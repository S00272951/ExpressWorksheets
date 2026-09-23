import { env } from "./config/env";
import carRoutes from './routes/cars';
import express, { Application, Request, Response } from "express";

const PORT = env.port;

const app: Application = express();

app.use(express.json());

app.use((req, _res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.use('/api/v1/cars', carRoutes);

app.get("/ping", async (_req: Request, res: Response) => {
    res.json({
        message: "hello from Himel"
    });
});

app.get('/bananas', async (_req: Request, res: Response) => {
    res.json({
        message: "this is bananas",
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
import { logger } from './middleware/logger.middleware';
import carRoutes from './routes/cars';
import express, { Application, Request, Response } from "express";
import { env } from "./config/env";
import { connectDB } from "./config/database";

const port = env.port;

const app: Application = express();

app.use(express.json());

app.use(logger);

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

const startServer = async () => {
    await connectDB();

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

startServer();
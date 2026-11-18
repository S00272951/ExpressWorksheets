import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { logger } from './middleware/logger.middleware';
import { errorHandler } from './middleware/error.middleware';
import carRoutes from './routes/cars';
import express, { Application, Request, Response } from "express";
import authRoutes from './routes/auth';

export const app: Application = express();

app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.use(logger);

app.use('/api/v1/cars', carRoutes);

app.use('/api/v1/auth', authRoutes);

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


app.use(errorHandler);
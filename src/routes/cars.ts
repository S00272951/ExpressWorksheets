import { validate } from '../middleware/validate.middleware';
import { createCarZSchema, updateCarZSchema } from '../models/cars';
import { Router } from 'express';
import { CarController } from '../controllers/cars';
import { authenticateKey } from '../middleware/auth.middleware';
import { logger } from '../middleware/logger.middleware';

const router = Router();
const carController = new CarController();


router.post('/', authenticateKey, logger, validate(createCarZSchema), carController.createCar);
router.get('/', carController.getCars);
router.get('/:id', carController.getCarById);
router.put('/:id', validate(updateCarZSchema), carController.updateCar);
router.delete('/:id', carController.deleteCar);

export default router;
import { Router } from 'express';
import carrerasController from '../controller/CarrerasControllers.js';
import carreraValidator from '../middlewares/carreraValidator.js';

const router = Router();


router.post('/', carreraValidator, carrerasController.createCarreras);
router.put('/:id', carreraValidator, carrerasController.updateCarrera);
router.delete('/:id', carrerasController.deleteCarrera);


router.get('/', carrerasController.getAllCarreras);
router.get('/:id', carrerasController.getCarreraById)

export default router;


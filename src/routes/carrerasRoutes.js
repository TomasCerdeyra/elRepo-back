import { Router } from 'express';
import carrerasController from '../controller/CarrerasControllers.js';
import carreraValidator from '../middlewares/carreraValidator.js';

const router = Router();

// Rutas protegidas para administradores con validación
router.post('/', carreraValidator, carrerasController.createCarreras);
router.put('/:id', carreraValidator, carrerasController.updateCarrera);
router.delete('/:id', carrerasController.deleteCarrera);

// Ruta pública para obtener todas las carreras
router.get('/', carrerasController.getAllCarreras);

export default router;


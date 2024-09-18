import { Router } from 'express';
import carrerasController from '../controller/CarrerasControllers.js';
import carreraValidator from '../middlewares/carreraValidator.js';
import { isAdminMiddle } from '../middlewares/isAdmim.js'; // Middleware que verifica si el usuario es administrador

const router = Router();

// Rutas protegidas para administradores con validación
//Agregar el middleware cuando tengamos el front
router.post('/', /* isAdminMiddle */ carreraValidator, carrerasController.createCarreras);
router.put('/:id', /* isAdminMiddle */ carreraValidator, carrerasController.updateCarrera);
router.delete('/:id', /* isAdminMiddle */ carrerasController.deleteCarrera);

// Ruta pública para obtener todas las carreras
router.get('/', carrerasController.getAllCarreras);

export default router;


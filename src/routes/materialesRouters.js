import { Router } from 'express';
import MaterialesController from '../controller/materialesController.js'
import { upload } from '../config/multer.js'; // Middleware para subir archivos

const router = Router();

//CRUD ----------------------------------------------------------------------------

//Subir material
router.post('/', upload.single('archivo'), MaterialesController.subirMaterial);

//Obtener material, Seguro q a esta la saquemos
router.get('/', MaterialesController.getMateriales);

// Eliminar una material
router.delete('/:id', MaterialesController.eliminarMaterial);

//Actualizar un material

//----------------------------------------------------------------------------------

//Obtener materialies de una materia
router.get('/:id', MaterialesController.getMaterialesByMateria)

//Reportar un material
router.put('/report/:id', MaterialesController.reportMaterial)



export default router;

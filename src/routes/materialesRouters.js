import { Router } from 'express';
import MaterialesController from '../controller/materialesController.js'
import { upload } from '../config/multer.js'; // Middleware para subir archivos

const router = Router();

//CRUD ----------------------------------------------------------------------------

//Subir material
router.post('/', upload.single('archivo'), MaterialesController.subirMaterial);

//Obtener todos los materiales, Seguro q a esta la saquemos
router.get('/', MaterialesController.getMateriales);

// Eliminar una material
router.delete('/:id', MaterialesController.eliminarMaterial);

//Actualizar un material

//Obtener un material
router.get('/material/:id', MaterialesController.getMaterial)

//----------------------------------------------------------------------------------


//Obtener materialies de una materia
router.get('/materia/:id', MaterialesController.getMaterialesByMateria)

//Reportar un material
router.put('/report/:id', MaterialesController.reportMaterial)

//Eliminar reporte de una materia
router.put('/deletereport/:id', MaterialesController.eliminarDenuncia)

//Obtener materiales reportados
router.get('/reportes', MaterialesController.getMaterialesReportados)



export default router;

import { Router } from "express";
import materiasController from "../controller/MateriasController.js";

const rooter = Router()

rooter.post('/',/* isAdminMiddle */ /*FALTARIA MIDDLEWARE*/ materiasController.createMateria);
rooter.put('/:id', /* isAdminMiddle */ /*FALTARIA MIDDLEWARE*/materiasController.updateMateria);
rooter.delete('/:id',/* isAdminMiddle */ /*FALTARIA MIDDLEWARE*/ materiasController.deleteMateria);

rooter.get('/', materiasController.getAllMaterias);



export default rooter;
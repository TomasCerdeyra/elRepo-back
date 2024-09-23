import { Router } from "express";
import materiasController from "../controller/materiasController.js";

const rooter = Router()

rooter.post('/',/*FALTARIA MIDDLEWARE*/ materiasController.createMateria);
rooter.put('/:id',  /*FALTARIA MIDDLEWARE*/materiasController.updateMateria);
rooter.delete('/:id',/*FALTARIA MIDDLEWARE*/ materiasController.deleteMateria);

rooter.get('/', materiasController.getAllMaterias);
rooter.get('/:id', materiasController.getMateriaByCarrera);

export default rooter;
import { Router } from "express";
import materiasController from "../controller/MateriasController.js";

const rooter = Router()

rooter.post('/',/*FALTARIA MIDDLEWARE*/ materiasController.createMateria);
rooter.put('/:id',  /*FALTARIA MIDDLEWARE*/materiasController.updateMateria);
rooter.delete('/:id',/*FALTARIA MIDDLEWARE*/ materiasController.deleteMateria);

rooter.get('/', materiasController.getAllMaterias);
rooter.get('/:id', materiasController.getMateriaByCarrera);
rooter.get('/materia/name', materiasController.getMateriaByName)

export default rooter;
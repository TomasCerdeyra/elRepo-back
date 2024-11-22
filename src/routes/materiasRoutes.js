import { Router } from "express";
import materiasController from "../controller/MateriasController.js";

const rooter = Router()

rooter.post('/',materiasController.createMateria);
rooter.put('/:id',  materiasController.updateMateria);
rooter.delete('/:id', materiasController.deleteMateria);

rooter.get('/', materiasController.getAllMaterias);
rooter.get('/:id', materiasController.getMateriaByCarrera);
rooter.get('/materia/name', materiasController.getMateriaByName)

export default rooter;
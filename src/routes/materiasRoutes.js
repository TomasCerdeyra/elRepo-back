import { Router } from "express";
import materiasController from "../controller/MateriasController.js";

const rooter = Router()

rooter.post('/', materiasController.createMateria)
rooter.get('/', materiasController.getAllMaterias)

export default rooter
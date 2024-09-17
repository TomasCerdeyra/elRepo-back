import { Router } from "express";
import carrerasController from "../controller/CarrerasControllers.js";

const rooter = Router()

rooter.post('/', carrerasController.createCarreras)
rooter.get('/', carrerasController.getAllCarreras)

export default rooter


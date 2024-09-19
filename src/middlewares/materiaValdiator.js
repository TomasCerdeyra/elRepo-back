import { body, validationResult } from "express-validator";

const materiaValidator = [

    body('name') 
    .notEmpty().withMessage('El nombre es requerido')
    .isString().withMessage('El nombre debe ser un texto válido')
    .trim(),

    /*FALTA COMPLETAR*/

]
import { body, validationResult } from 'express-validator';

const carreraValidator = [
  body('name')
    .notEmpty().withMessage('El nombre es requerido')
    .isString().withMessage('El nombre debe ser un texto válido')
    .trim(),
  
  body('area')
    .notEmpty().withMessage('El área es requerida')
    .isString().withMessage('El área debe ser un texto válido')
    .trim(),

  // Middleware para manejar los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export default carreraValidator;

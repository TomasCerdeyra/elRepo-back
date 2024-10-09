import { Router } from 'express';
import passport from 'passport';
import AuthController from '../controller/authController.js';

const router = Router();

//http://localhost:8080/api/auth/google/

// Ruta para iniciar el proceso de autenticación con Google
router.get('/google', AuthController.googleAuth);

// Ruta de callback de Google que maneja la respuesta de Google después de la autenticación
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: 'http://localhost:5173/errorlogin', // Redirige a la página de login en caso de fallo(Cuando tenga el front poner la direccion real)
  failureMessage: 'Access denied', // Mensaje de error en caso de fallo
}), 
AuthController.redirectAfterSuccess);

// Ruta para cerrar sesión
router.get('/logout', AuthController.logout);

//Ruta estado de autenticacion
router.get('/status', AuthController.userStatus)

export default router;

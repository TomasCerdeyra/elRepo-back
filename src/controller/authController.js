import passport from 'passport';

class AuthController {
    static googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

    static redirectAfterSuccess = (req, res) => {
        // Verificamos si el usuario está autenticado y si su correo es de administrador
        const adminEmails = ['tcerdeyra@alumnos.unsada.edu.ar', 'cerdeyra@alumnos.unsada.edu.ar'];

        if (adminEmails.includes(req.user.email)) {
            return res.redirect('/admin');  // Redirigir a la página de administrador
        }

        res.redirect('/');  // Redirigir a la página principal si no es administrador
    };

    static logout = (req, res) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/login');  // Redirigir a la página de login después de cerrar sesión
        });
    };
}

export default AuthController;

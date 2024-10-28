import passport from 'passport';

class AuthController {
    static googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

    //http://localhost:8080/api/auth/google/
    static redirectAfterSuccess = (req, res) => {
        if (req.user.isAdmin) {
            res.redirect('http://localhost:5173/admin');  // Redirige al panel de administrador si es admin
        } else {
            res.redirect('http://localhost:5173/home');  // Redirige a la página principal para usuarios normales
        }
    };

    static logout = (req, res) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            req.session.destroy();
            res.redirect('http://localhost:5173/'); // Redirigir a la página de login después de cerrar sesión
        });
    };

    static userStatus = (req, res) => {
        if (req.isAuthenticated()) {
            return res.json({ logueado: true, user: req.user });
        } else {
            return res.json({ logueado: false });
        }
    }
}

export default AuthController;

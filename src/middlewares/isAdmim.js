export const isAdminMiddle = (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
        return next();
    }
    res.status(403).send('Acceso denegado. Solo los administradores pueden realizar esta acción.');
};

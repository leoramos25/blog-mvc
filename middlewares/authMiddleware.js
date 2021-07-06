module.exports.isLogged = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'login to continue!');
        return res.redirect('/users/login');
    }
    next();
};
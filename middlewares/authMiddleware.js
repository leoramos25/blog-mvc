exports.isLogged = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'login to continue!');
        return res.redirect('/users/login');
    }
    next();
};

exports.changePassword = (req, res) => {
    if (req.body.password != req.body['password-confirm']) {
        req.flash('error', 'Passwords do not match!');
        res.redirect('/profile');
        return;
    }

    req.user.setPassword(req.body.password, async () => {
        await req.user.save();

        req.flash('sucess', 'password changed!');
        res.redirect('/profile');
    });
};
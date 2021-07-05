const User = require('../models/User');

exports.login = (req, res) => {
    res.render('login');
};

exports.loginAction = (req, res) => {
    const auth = User.authenticate();

    auth(req.body.email, req.body.password, (error, result) => {
        if (!result) {
            req.flash('error', 'E-mail/password incorrect!');
            res.redirect('/users/login');
            return;
        }

        req.flash('sucess', 'You are loged!');
        res.redirect('/');
    });
};

exports.register = (req, res) => {
    res.render('register')
};

exports.registerAction = (req, res) => {
    const newUser = new User(req.body);
    User.register(newUser, req.body.password, (error) => {
        if (error) {
            req.flash('error', 'Error, try again later!');
            console.log('Error when registerin: ' + error);
            res.redirect('/users/register');
            return;
        };

        req.flash('sucess', 'Registration performed sucessfully!');
        res.redirect('/users/login');
    });
};
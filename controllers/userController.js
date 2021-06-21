const User = require('../models/User');

exports.login = (req, res) => {
    res.render('login');
};

exports.register = (req, res) => {
    res.render('register')
};

exports.registerAction = (req, res) => {
    const newUser = new User(req.body);
    User.register(newUser, req.body.password, (error) => {
        if(error) {
            console.log('Error when registerin: ' + error);
            res.redirect('/users/register');
            return;
        };

        res.redirect('/')
    });
};
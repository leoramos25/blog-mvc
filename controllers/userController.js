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

        req.login(result, () => { });

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

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

exports.profile = (req, res) => {
    res.render('profile');
};

exports.profileAction = async (req, res) => {
    try {
        const user =  await User.findOneAndUpdate(
            { _id: req.user._id },
            { name: req.body.name, email: req.body.email },
            { new: true, runValidators: true }
        );
    } catch (error) {
        req.flash('error', 'Fail to update data: ' + error.message);
        res.redirect('/profile');
        return
    }

    req.flash('sucess', 'Profile is updated!');
    res.redirect('/profile');
};
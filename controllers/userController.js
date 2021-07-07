const User = require('../models/User');
const crypto = require('crypto');
const mailHandler = require('../handlers/mailHandler');

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
        const user = await User.findOneAndUpdate(
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

exports.forget = (req, res) => {
    res.render('forget');
};

exports.forgetAction = async (req, res) => {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
        req.flash('error', 'sended email!');
        res.redirect('/users/forget');
        return;
    }

    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordTokenExpires = Date.now() + 3600000;
    await user.save();

    const redefinePasswordLink = `http://${req.headers.host}/users/reset/${user.resetPasswordToken}`;

    const to = `${user.name} <${user.email}>`;

    const html = `Test send email with link for reset password: <a href="${redefinePasswordLink}">Change password</a>`;
    
    const text = `Test send email with link for reset password: ${redefinePasswordLink}`;

    mailHandler.send({
        to,
        subject: 'Password reset',
        html,
        text,
    });

    req.flash('sucess', 'Instructions email sended!');
    res.redirect('/users/login');

};

exports.forgetToken = async (req, res) => {
    const user = User.findOne({
        resetPasswordToken: req.param.token,
        resetPasswordTokenExpires: { $gt: Date.now() },
    }).exec();

    if (!user) {
        req.flash('error', 'Token expired');
        res.redirect('/users/forget');
        return;
    };

    res.render('forgetPassword');
};

exports.forgetTokenAction = async (req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordTokenExpires: { $gt: Date.now() },
    }).exec();

    if (!user) {
        req.flash('error', 'Token expired');
        res.redirect('/users/forget');
        return;
    };

    if (req.body.password != req.body['password-confirm']) {
        req.flash('error', 'Passwords do not match!');
        res.redirect('back');
        return;
    }

    user.setPassword(req.body.password, async () => {
        await user.save();

        req.flash('sucess', 'password changed!');
        res.redirect('/');
    });
};
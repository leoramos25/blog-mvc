const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.add = (req, res) => {
    res.render('postAdd');
};

exports.addAction =  async (req, res) => {
    const post = new Post(req.body);

    try{
    await post.save();
    }catch(error) {
        req.flash('error', 'Error, try again later');
        return res.redirect('/post/add');
    };

    req.flash('sucess', 'Post added!');
    res.redirect('/');
};
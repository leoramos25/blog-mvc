const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.index =  async (req, res) => {
    let data = {
        pageTitle:'',
        posts: [],
    };

    const posts = await Post.find();
    data.posts = posts;

    res.render('home', data);
};
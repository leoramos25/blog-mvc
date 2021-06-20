const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.index =  async (req, res) => {
    let data = {
        pageTitle:'',
        posts: [],
        tags:[],
        tag:'',
    };

    data.tag = req.query.tag;

    const tags = await Post.getTagsList();
    for(let i in tags) {
        if(tags[i]._id == data.tag) {
            tags[i].class = 'selected';
        };
    };
    data.tags = tags;

    const posts = await Post.find();
    data.posts = posts;

    res.render('home', data);
};
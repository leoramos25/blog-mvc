const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.add = (req, res) => {
    res.render('postAdd');
};

exports.addAction =  async (req, res) => {
    const post = new Post(req.body);

    try{
    await post.save();
    } catch(error) {
        req.flash('error', 'Error, try again later');
        return res.redirect('/post/add');
    };

    req.flash('sucess', 'Post added!');
    res.redirect('/');
};

exports.edit = async (req, res) => {
    const post =  await Post.findOne({slug:req.params.slug});

    res.render('postEdit', {post});
};

exports.editAction = async (req, res) => {
    const post = await Post.findOneAndUpdate(
        {slug:req.params.slug},
        req.body,
        {
            new:true,
            runValidators:true,
        },
    );

    req.flash('sucess', 'Updated post!');
    res.redirect('/');
};
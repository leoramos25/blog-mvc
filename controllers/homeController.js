const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.index = async (req, res) => {
    let data = {
        pageTitle: '',
        posts: [],
        tags: [],
        tag: '',
    };

    console.log(req.user);

    data.tag = req.query.tag;
    const postFilter = (typeof data.tag != 'undefined') ? { tags: data.tag } : {};

    const tagsPromise = Post.getTagsList();
    const postsPromise = Post.find(postFilter);

    const [tags, posts] = await Promise.all([tagsPromise, postsPromise]);

    for (let i in tags) {
        if (tags[i]._id == data.tag) {
            tags[i].class = 'selected';
        };
    };
    data.tags = tags;
    data.posts = posts;

    res.render('home', data);
};
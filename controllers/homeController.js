exports.index = (req, res) => {
    let data = {
        pageTitle:'',
        userInfo:req.userInfo,
    }; 
    res.render('home', data);
};
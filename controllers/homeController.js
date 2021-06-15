exports.index = (req, res) => {
    let data = {
        pageTitle:'APRENDENDO NODEJS',
        userInfo:req.userInfo,
    }; 
    res.render('home', data);
};
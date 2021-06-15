exports.userMiddleware = (req, res, next) => {
    let info = {
        name:'Leonardo',
        id:1,
    };
    req.userInfo = info;
    next();
};

exports.index = (req, res) => {
    let data = {
        pageTitle:'APRENDENDO NODEJS',
        userInfo:req.userInfo,
    }; 
    res.render('home', data);
};
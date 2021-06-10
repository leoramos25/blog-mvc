const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
    let data = {
        'name':'Leonardo',
        'age':22,
    }
    
    res.render('home');
});

module.exports = router;
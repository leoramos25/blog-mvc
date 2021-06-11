const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
    let data = {
        name: req.query.name,
        surname: req.query.surname,
        open:true,
        studies:[
            {topic:'Javascript', hours:2},
            {topic:'NodeJS', hours:2},
            {topic:'C#', hours:2},
            {topic:'ReactJS', hours:1},
            {topic:'SQL', hours:0.5},
            {topic:'NoSQL',hours:0.5},
        ],
        objectives: [
            'JavaScript',
            'NodeJS',
            'C#',
            'ReactJS',
            'React Native',
            'SQL',
            'NoSQL'
        ],
    }; 

    res.render('home', data);
});

module.exports = router;
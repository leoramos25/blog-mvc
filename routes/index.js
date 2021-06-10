const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
    res.json(req.query);
});

router.get('/posts/:slug', (req, res) => {
    let slug = req.params.slug;

    res.send('SLUG do post ' + slug);
});

router.get('/sobre', (req, res) => {
    res.send('Página sobre');
});

module.exports = router;
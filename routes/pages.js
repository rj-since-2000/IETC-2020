const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('sign-in');
});

router.get('/sign-up.hbs', (req, res) => {
    res.render('sign-up');
});

router.get('/contact.hbs', (req, res) => {
    res.render('contact');
});

router.get('/about.hbs', (req, res) => {
    res.render('about');
});

// router.get('/shop.hbs', (req, res) => {
//     res.render('shop');
// });

module.exports = router;
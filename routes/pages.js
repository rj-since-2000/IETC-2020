const express = require('express');

const router = express.Router();

const verify = require('../controllers/verifyToken');

const logout = require('../controllers/logout');

router.get('/', (req, res) => {
    res.render('sign-in');
});

router.get('/sign-up.hbs', (req, res) => {
    res.render('sign-up');
});

router.get('/contact.hbs', verify, (req, res) => {
    res.render('contact');
});

router.get('/about.hbs', verify, (req, res) => {
    res.render('about');
});

router.get('/logout', (req, res) => {
    logout(req, res);
});

// router.get('/shop.hbs', (req, res) => {
//     res.render('shop');
// });

module.exports = router;
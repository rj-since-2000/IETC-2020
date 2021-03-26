const express = require('express');

const router = express.Router();

const verify = require('../controllers/verifyToken');

const logout = require('../controllers/logout');
const { pay } = require('../controllers/payment');

router.get('/', (req, res) => {
    res.render('sign-in');
});

router.get('/sign-up.hbs', (req, res) => {
    res.render('sign-up');
});

router.get('/contact.hbs', verify, (req, res) => {
    res.render('contact');
});

router.get('/payment.hbs', verify, (req, res) => {
    res.render('payment');
});

router.get('/logout', (req, res) => {
    logout(req, res);
});

router.post('/pay', verify, pay);

module.exports = router;
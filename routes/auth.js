const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

const verify = require('../controllers/verifyToken');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/shop', verify, (req, res) => {
    res.render('shop');
});

router.get('/sign-up.hbs', (req, res) => {
    res.render('sign-up');
});

module.exports = router;
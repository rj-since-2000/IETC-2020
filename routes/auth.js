const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/shop', (req, res) => {
    res.render('shop');
});

module.exports = router;
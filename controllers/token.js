const jwt = require('jsonwebtoken');

const generateToken = (res, id) => {
    const expiration = 50000000;
    const token = jwt.sign({ id }, 'bugsecretkey', { expiresIn: '1d' });
    return res.cookie('token', token, {
        expires: new Date(Date.now() + expiration),
        secure: false, // set to true if your using https
        httpOnly: true,
    });
};
module.exports = generateToken

// generateToken.js file
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token || '';
    try {
        if (!token) {
            return res.status(401).json('You need to Login')
        }
        const decrypt = await jwt.verify(token, 'bugsecretkey');
        req.user = {
            id: decrypt.id,
        };
        next();
    } catch (err) {
        return res.status(500).json(err.toString());
    }
};

module.exports = verifyToken;
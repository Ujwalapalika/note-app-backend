// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/auth');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateJWT };

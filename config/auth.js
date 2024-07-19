const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

const generateToken = (user) => {
    return jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
};

module.exports = { generateToken, SECRET_KEY };

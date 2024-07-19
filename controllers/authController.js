const bcrypt = require('bcrypt');
const { db } = require('../config/database');
const { generateToken } = require('../config/auth');

const register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], function(err) {
        if (err) {
            return res.status(500).send('Registration failed');
        }
        const token = generateToken({ id: this.lastID });
        res.json({ token });
    });
};

const login = (req, res) => {
    const { username, password } = req.body;

    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
        if (err || !user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Authentication failed');
        }
        const token = generateToken(user);
        res.json({ token });
    });
};

module.exports = { register, login };

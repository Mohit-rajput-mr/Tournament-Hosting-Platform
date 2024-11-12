const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    register: (req, res) => {
        User.create(req.body, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'User registered successfully' });
        });
    },

    login: (req, res) => {
        const { username, password } = req.body;
        User.findByUsername(username, (err, results) => {
            if (err || results.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            const user = results[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err || !isMatch) return res.status(401).json({ error: 'Invalid credentials' });
                const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
                res.json({ message: 'Login successful', token });
            });
        });
    }
};

module.exports = authController;

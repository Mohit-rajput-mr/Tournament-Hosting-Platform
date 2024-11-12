const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    create: (userData, callback) => {
        const { name, username, email, password } = userData;
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return callback(err);
            const query = 'INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)';
            db.query(query, [name, username, email, hashedPassword], callback);
        });
    },

    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], callback);
    }
};

module.exports = User;

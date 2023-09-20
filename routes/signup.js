const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const pool = require('../config/database'); // Import the database pool

router.get('/', (req, res) => {
    const signupPath = path.join(__dirname, '..', 'views', 'signup.html');
    res.sendFile(signupPath);
});

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user data into the 'users' table
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        const values = [name, email, hashedPassword];

        const [result] = await pool.execute(sql, values);

        // Redirect to the login page after successful signup
        res.redirect('/login');
    } catch (err) {
        // Handle error
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).send('User already exists');
        }
        return res.status(500).send('Error during signup');
    }
});

module.exports = router;

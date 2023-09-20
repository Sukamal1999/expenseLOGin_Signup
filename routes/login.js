const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const pool = require('../config/database'); // Import the database pool

router.get('/', (req, res) => {
    const loginPath = path.join(__dirname, '..', 'views', 'login.html');
    res.sendFile(loginPath);
});

router.get('/login', (req, res) => {
    const expensePath = path.join(__dirname, '..', 'views', 'add-expense.html');
    res.sendFile(expensePath);
});


router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const userQuery = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await pool.execute(userQuery, [email]);

        if (rows.length === 0) {
            // User not found
            return res.status(404).send('User not found');
        }

        const user = rows[0];

        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // Passwords match
            // Redirect to add-expense.html after successful login
            res.status(200).send('<script>alert("User login successful"); window.location.href = "/add-expense.html";</script>');
        } else {
            // Passwords don't match, send a pop-up alert message
            res.status(401).send('<script>alert("User not authorized"); window.location.href = "/login";</script>');
        }
    } catch (err) {
        // Handle error
        console.error(err);
        res.status(500).send('<script>alert("Error during login"); window.location.href = "/login";</script>');
    }
});

module.exports = router;

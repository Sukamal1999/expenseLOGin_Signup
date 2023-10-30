const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '..', 'views', 'add-expense.html');
    res.sendFile(indexPath);
});

module.exports = router;
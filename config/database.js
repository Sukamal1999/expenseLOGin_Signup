const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'sukamal',
    database: 'expense_tracker',
});

module.exports = pool.promise();

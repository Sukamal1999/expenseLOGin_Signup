const mysql = require('mysql2');
const dbConfig = require('./database');

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Function to add a new expense
function addExpense(amount, description, category, callback) {
    pool.query(
        'INSERT INTO expenses (amount, description, category) VALUES (?, ?, ?)',
        [amount, description, category],
        (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
}

// Function to retrieve all expenses
function getAllExpenses(callback) {
    pool.query('SELECT * FROM expenses', (error, results) => {
        if (error) {
            return callback(error);
        }
        return callback(null, results);
    });
}

module.exports = {
    addExpense,
    getAllExpenses,
};

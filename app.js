const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Error handling middleware (place it before defining routes)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Routes
const indexRoute = require('./routes/index');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const expenseRoute = require('./routes/add-expense');

app.use('/', indexRoute);
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/add-expense', expenseRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

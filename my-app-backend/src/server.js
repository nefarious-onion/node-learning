const express = require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');

app.use(bodyParser.urlencoded({ extended: false }));

//mongoose.connect('mongodb://localhost:27017/test');

const db = mongoose.connection;
db.on('error', (err) => { console.log(`An error has occcured while connecting to DB: ${err}`); });
db.on('open', () => { console.log(`Connected to database. `); });

// only logged in user should be able to reach this endpoint
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/api/views/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/api/views/login.html');
});

app.post('/login/send', (req, res) => {
    // Add the logic to authenticate user
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/api/views/register.html');
});

app.post('/register/send', (req, res) => {
    let newUser = new User();
    newUser.firstname = req.body.firstName;
    newUser.lastname = req.body.lastName;
    newUser.username = req.body.username;
    newUser.password = req.body.password;
    newUser.phone = req.body.phone;

    console.log(newUser);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
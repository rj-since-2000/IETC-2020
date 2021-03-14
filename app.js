const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: './.env' });

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'warnise',
    port: '8889'
});

const cookieParser = require('cookie-parser');

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
const assetsDirectory = path.join(__dirname, './assets');
app.use(express.static(assetsDirectory));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'hbs');

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MySQL connected...")
    }
});

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5001, () => {
    console.log("Server connected on port 5001");
});

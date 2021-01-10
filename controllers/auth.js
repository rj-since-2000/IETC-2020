const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'warnise',
    port: '8889'
});

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).render('sign-in', {
                message: 'Please provide an email and password'
            });
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            console.log(results);
            if (!results || !(await bcrypt.compare(password, results[0].password))) {
                res.status(401).render('sign-in', {
                    message: 'Email or password is incorrect'
                });
            } else {
                res.status(200).redirect('shop');
            }
        });
    } catch (error) {
        console.log(error);
    }
}

exports.register = (req, res) => {
    console.log(req.body);
    const { email, password, confirmPassword } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('sign-up', {
                message: 'That email is already in use'
            });
        } else if (password !== confirmPassword) {
            return res.render('sign-up', {
                message: 'Passwords do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', { email: email, password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('sign-up', {
                    message: 'User registered'
                });
            }
        });
    });
}
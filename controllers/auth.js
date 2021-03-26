const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var datetime = require('node-datetime');
const publicIp = require('public-ip');
const db = require('../app');

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'warnise',
//     port: '8889'
// });

const generateToken = require('./token');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).render('sign-in', {
                message: 'Please provide an email and password'
            });
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (results.length == 0) {
                res.status(401).render('sign-in', {
                    message: 'User does not exist!'
                });
            }
            else if (!results || !(await bcrypt.compare(password, results[0].password))) {
                var dt = datetime.create();
                var formatted = dt.format('m/d/Y H:M:S');
                // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                // console.log(ip);
                var ipv4 = String(await publicIp.v4());
                var ipv6 = String(await publicIp.v6());
                values = [
                    [email, password, formatted, ipv4, ipv6],
                ];
                console.log(values);
                db.query("INSERT INTO records (email,password,time,ipv4,ipv6) VALUES ?", [values], async (error, results) => {
                });
                res.status(401).render('sign-in', {
                    message: 'Email or password is incorrect'
                });
            } else {
                const id = results[0].id;
                await generateToken(res, id);
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
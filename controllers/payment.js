const db = require('../app');
const publicIp = require('public-ip');

exports.pay = async function (req, res) {
    const id = req.user.id;
    const { amount } = req.body;
    const ipv4 = req.ip;
    values = [
        [id, ipv4, amount],
    ];
    db.query("INSERT INTO orders (user_id,ipv4,amount) VALUES ?", [values], async (error, results) => {
        if (results.length == 0) {
        } else {
            res.status(200).render('');
        }
    });
}
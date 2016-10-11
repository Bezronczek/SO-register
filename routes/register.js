let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let config = require('../config.json');
const sha1 = require('sha1');

router.get('/', (req, res, next) => {
  res.render('register');
});

router.post('/', registerUser);
/**
 *
 * @param req
 * @param req.body
 * @param req.body.login
 * @param req.body.email
 * @param res
 * @param next
 */
function registerUser(req, res, next) {
  let connection = mysql.createConnection(config.auth);
  const shaPass = sha1(`${req.body.login.toUpperCase()}:${req.body.password.toUpperCase()}`);

  let query = "INSERT INTO `account` (username, sha_pass_hash, email, expansion) VALUES(?, ?, ?, 2)";
  let inserts = [req.body.login, shaPass, req.body.email];

  connection.query(query, inserts, (err, rows, fields) => {
    if (err) {
      res.sendStatus(500);
      throw err;
    }

    res.render('register', {
      post: true
    });
  });

  connection.end();

}

module.exports = router;
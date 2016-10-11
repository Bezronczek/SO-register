let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let config = require('../config.json');



function listUserAccounts() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(config.auth);
    connection.query('SELECT username as user, id FROM `account` ORDER BY `id` ASC', (error, results, fields) => {
      if(error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function getUserDetails(id) {
  const connection = mysql.createConnection(config.auth);
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM `account` WHERE id = ?', [id], (error, results, fields) => {
      if(error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

/* GET users listing. */
router.get('/', function(req, res, next) {

  const connection = mysql.createConnection(config.auth);
  connection.query('SELECT username as user, id FROM `account` ORDER BY `id` DESC', (error, results, fields) => {
    if(error) {
      res.status(500).send(error.stack || error);
      return;
    }

    res.json(results);
    connection.end();
  });
});

router.get('/:id', function (req, res, next) {

  const connection = mysql.createConnection(config.auth);
  connection.query('SELECT * FROM `account` WHERE id = ?', [req.params.id], (error, results, fields) => {
    if(error) {
      res.status(500).send(error.stack || error);
      return;
    }

    res.json(results);
    connection.end();
  });

});

module.exports = router;

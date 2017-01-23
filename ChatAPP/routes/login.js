var express = require('express');
var router = express.Router();
var mysql = require('mysql');//get access to the mysql
var config = require('../model/config');//inprove the speed
var pool = mysql.createPool(config.mysql);
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', {title: 'login'});

});
router.post('/userLogin', function (req, res, next) {
  global.Content = "";
  var FirstName = req.body.FirstName;
  var LastName = req.body.LastName;
  global.FirstName=FirstName;
  global.LastName=LastName;
  pool.getConnection(function (err, connection) {
      var $sql1 = "INSERT INTO User() VALUES(?,?)";
      connection.query($sql1, [FirstName,LastName], function (err, result) {
         // console.log(result);
          //console.log("!!!");
          res.json(result); //give information back to front
          connection.release();// 释放连接
    });

  });
    //res.render('index', {title: 'Chat Room'});
});
module.exports = router;

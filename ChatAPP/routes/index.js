var express = require('express');
var router = express.Router();
var mysql = require('mysql');//get access to the mysql
var config = require('../model/config');//inprove the speed
var pool = mysql.createPool(config.mysql);
var sd = require('silly-datetime'); //time
var FirstName;
var LastName;
/* GET home page. */
router.post('/exit',function(req, res, next) {
    pool.getConnection(function (err, connection) {
        var $sql1 = "Delete from User where FirstName=? and LastName=?";
        connection.query($sql1, [global.FirstName, global.LastName], function (err, result) {
            console.log("delete successful");
            res.render('login', {title: 'login'});

        })
    })
})
router.post('/Chat', function(req, res, next) {
    var txt = "";
    txt = req.body.txt;
    console.log(txt);
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    console.log(time);
    console.log("doit CHAT!");
    global.Content="";
    if (txt!="")
    pool.getConnection(function (err, connection) {
        var $sql1 = "INSERT INTO Data(FirstName,LastName,Time,Text) VALUES(?,?,?,?)";
        connection.query($sql1, [global.FirstName,global.LastName,time,txt],function (err, result) {
            console.log("!!!");
            //res.render('index', { title: 'Chat Room' });

            $sql1 = "Select * from Data";
            connection.query($sql1,function (err, result) {
                console.log("update chatting");

                for (var i=0;i<result.length;i++)
                {
                    //console.log(result[i]);
                    if (result[i].FirstName==null) result[i].FirstName='';
                    if (result[i].LastName==null) result[i].LastName='';
                    global.Content=global.Content+result[i].FirstName+" "+result[i].LastName+"\n"+result[i].Time+"\n"+result[i].Text+"\n\n";
                }
                //history.go(0);
                res.render('index', { title: 'Chat Room' });
                connection.release();
            });

        });

    });
    else res.redirect("/");
    //res.redirect('/');
})
router.get('/', function(req, res, next) {
    // console.log("start");
    // if (global.judge==true)
    // {
    //     console.log('chat!');
    //     global.judge==false;
    // }


    global.Content="";
    pool.getConnection(function (err, connection) {
        $sql1 = "Select * from Data";
        connection.query($sql1,function (err, result) {
            console.log("update chatting");

            for (var i=0;i<result.length;i++)
            {
                //console.log(result[i]);
                if (result[i].FirstName==null) result[i].FirstName='';
                if (result[i].LastName==null) result[i].LastName='';
                global.Content=global.Content+result[i].FirstName+" "+result[i].LastName+"\n"+result[i].Time+"\n"+result[i].Text+"\n\n";
            }
            res.render('index', { title: 'Chat Room' });

        });

        // var $sql1 = "select * from User";
        // connection.query($sql1, function (err, result) {
        //     //console.log("!!!");
        //     //res.json(result); //give information back to front
        //     //console.log(result);
        //
        //     return 0;
        // });

        connection.release();
    });
});


module.exports = router;

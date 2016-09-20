var express = require('express');
var router = express.Router();


var crypto = require('crypto');//加载生成MD5值依赖模块

var user = require('../models/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '曹胜祥的主页', contain: 'Welcome to my home!'});
});

router.get('/login', function(req, res, next) {
    res.render('login', {title: '曹胜祥的主页'});
});

router.get('/logout', function(req, res) {
    res.render('logout');
});

router.get('/register', function(req, res) {
   res.render('register'); 
});

router.post('/registerP', function(req, res) { 
   var md5 = crypto.createHash('md5');
   var pw = md5.update(req.body.password).digest('base64');
   
   var doc = {username: req.body.username, password: pw};
   console.log(doc);
   var addUser = new user.model(doc);
   addUser.save();
   setTimeout(function(){
       res.render('regSuccess');
   },200);
}); 

router.get('/404', function(req, res) {
    res.render('404');
});

router.post('/home', function(req, res) {
    var md5 = crypto.createHash('md5');
    var query_doc = {username: req.body.username, password: md5.update(req.body.password).digest('base64')};
    console.log(query_doc);
    (function(){
          user.model.count(query_doc, function(err, doc){
              if(doc === 1){
                  console.log(query_doc.username + ":login success in " + new Date());
                  res.render('home', {title: "主页"});
              }else {
                  console.log(err);
                  console.log(query_doc.username + ": login failed in " + new Date());
                  res.redirect('/');    //重定向
              }
        })
    })(query_doc);
})



module.exports = router;

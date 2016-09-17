var express = require('express');
var router = express.Router();

var user = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  
  
  //插入
  var doc = {username: "cccccc", password: "123456"};
  user.model.create(doc, function(error) {
      if(error) {
          console.log(error);
      } else {
          console.log("save ok");
      }
  });
  
  //删除
  user.model.remove({username: "cccccc"}, function(error) {
      if(error) {
          console.log("del" + error);
      } else {
          console.log("delete ok");
      }
  });
  
  //update更新
// db.collection.update(
// <query>,
// <update>,
// {
//   upsert: <boolean>,
//   multi: <boolean>,
//   writeConcern: <document>
// }
//)
  user.model.update({
        username:"zhang3"
    },
    {$set: {password: "000000"}},
    {
        upsert: false,
        multi: false
    }, function(err) {
         if(err) {
             console.log(err);
         } else {
           console.log("update ok!");  
         }
    });
    
  //res.send('respond with a resource');  
});

router.get('/zhang3', function(req, res) {
  //查询
  user.model.find({},//查询条件
    {username: 1, password: 1},//查询的返回结果
    {},//options
    function(error, result){//回掉
        if(error){
            console.log(error);
        } else {
            //console.log(result);
            //res.send(result);
            res.json(result);
        }
    }
  );
});

module.exports = router;

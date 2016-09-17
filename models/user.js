var mongoose = require("mongoose"); //	顶会议用户组件
//数据库连接
mongoose.connect('mongodb://localhost/caosx');

//mongoose.connection.close();//不要再此处关闭，在route关


var Schema = mongoose.Schema; //	创建模型
var userScheMa = new Schema({
	username: String,
	password: String
})								//	定义了一个新的模型，但是此模式还未和users集合有关联




exports.model = mongoose.model('users',userScheMa);//   与users集合关联

//第二种链接方式
/*var db = mongoose.createConnection('mongodb://localhost/caosx');
db.on('error', console.error.bind(console, '连接错误：'));
db.once('open', function() {
    //一条记录
    console.log("openned");
    
    
})
exports.model = db.model('users',userScheMa);*/
/*db.close(); //关闭数据库链接*/
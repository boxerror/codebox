

//引入express框架
var express = require('express');

//引入bodyParser模块，用来接收post提交的数据
var bodyParser = require('body-parser');

//引入session模块
var session = require('express-session');

//var server = http.createServer();
var app = express();


app.use(session({
    secret: '12345',
    name: 'expressID',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));

//设置表单提交方式为urlencoded提交方式
app.use( bodyParser.urlencoded({extended: true}) );

//设置前端页面目录
app.set('views', __dirname + '/views');

app.engine('html', require('ejs').__express);

app.set('view engine', 'html');

app.use('/public', express.static(__dirname + '/public') );

app.use('/admin', require('./routers/admin.js') );//后台模块

app.use('/', require('./routers/main.js') );//前台模块



app.listen(300);

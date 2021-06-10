var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var temp_dir = path.join(__dirname, 'templates');

app.use(express.static(temp_dir));
app.use(bodyParser.urlencoded({extended:true}));

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');
app.set('views', temp_dir);

app.get('/index', function(req, res){
    res.render('index.html');
});

app.get('/', function(req, res){
    res.render('index.html');
});

app.get('/about', function(req, res){
    res.render('about.html');
});

const port = process.env.PORT || 3000

var server = http.createServer(app);
server.listen(port);

console.log('Server running at http://127.0.0.1:' + {port} + '/');
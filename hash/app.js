const fs = require('fs') 
var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var os = require("os");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var cookieParser = require('cookie-parser');
var multer = require('multer');
var upload = multer(); 
var session = require('express-session');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: "yayayay"}));

let lflag = 0;

let random_k = 9;
 
// Running Server Details.
var server = app.listen(8082, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at %s:%s Port", host, port)
});

var crypto = require('crypto');

var Users = [{id: 'letmein'}];

var generate_key = function() {
    var sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    return sha.digest('hex');
};


let quotes = ['Don\'t miss the details','Judge :: Suicide','May there be peace','The most wisest are the most ignorant','The war is coming','Let the war begin','The wants of the soul are never ending','Beauty is in the emptiness','... ?','So, what is it gonna be ?','It\'s all an illusion','Illumination === Illusion']; 

app.use(express.static(__dirname + '/public'));

app.disable('x-powered-by');

app.set('view engine', 'jade');

sessionso = []

app.get('/l', urlencodedParser, function (req, res){
	 res.render('l');
	 });
app.get('/bot', urlencodedParser, function (req, res){
	 res.sendfile('bot.exe');
	 });
	 
app.get('/commands', function(req, res){
	if(req.session.user){
	res.render('commands');}
	else{res.render('404');}
});
app.get('/logout', function(req, res){
	if(req.session.user){
	req.session.destroy(function(){
   });
   res.redirect('/');
	}
	else{res.render('404');}
});

app.get('/', function(req, res){
	if(req.session.user){
	res.render('index', {hello: quotes[Math.floor(Math.random() * 10)]});}
	else{res.render('404');}
});

app.post('/', function(req, res){
   console.log(Users);
   if(!req.body.key1){
      res.render('404');
   } else {
      Users.filter(function(user){
         if(user.id === req.body.key1){
			console.log(user);
            req.session.user = user;
			console.log(req.session);
			console.log('hi');
            res.render('index', {hello: quotes[Math.floor(Math.random() * 10)]});
         }
		 else{res.render('404');}
      });
   }
});
	 
app.post('/darude', urlencodedParser, function (req, res){
	if(req.body.p == "swipernoswiping"){
	 let j = fs.readFileSync('views/darude', 'utf8');
	res.send(j);}
	else{
	res.send("Fuck away, Nigga.");
	}
});
 

 
 app.post('/commands', urlencodedParser, function (req, res){
  if(((sessionso.length) && ((sessionso.includes(req.cookies.sas.toString()))))){
  var reply='';
  reply += req.body.com;
  fs.writeFile('views/darude', reply);
  reply += '\n';
  fs.appendFile('n.txt', reply);
  res.render('commands', {hello: 'Command \'' + req.body.com + '\' sent successfully.'} );
	}
  else{
	  res.send("... ?");
  }
 });
 
 module.exports = app;
 module.exports = lflag;
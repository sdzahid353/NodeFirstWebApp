var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	database : 'join_us'
});



app.get("/", function(req,res){
	res.send("Welcome to Homepage");
});


app.get("/users", function(req, res){
	var q = "SELECT COUNT(*) as count FROM users";
	connection.query(q, function(err, result){
		if (err) throw err;
		var count = result[0].count
		res.send("We have "+ count + " users");
	});
});

app.get("/joke", function(req,res){
	var joke = "What do you call a dog that does magic tricks? A labracadabrador.";
	res.send(joke);
});


app.get("/random_num", function(req,res){
	var num = Math.floor(Math.random()*10) + 1
	res.send("Your lucky number is "+ num);
})


app.listen(3000, function(){
	console.log("Server is running on Port 3000");
});

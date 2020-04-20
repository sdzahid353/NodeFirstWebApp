var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser')
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended : true }))
app.use(express.static(__dirname + "/public"))

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	database : 'join_us'
});



app.get("/", function(req,res){
	res.send("<h1>Welcome to Homepage</h1>");
});


app.get("/users", function(req, res){
	var q = "SELECT COUNT(*) as count FROM users";
	connection.query(q, function(err, result){
		if (err) throw err;
		var count = result[0].count
		// res.send("We have "+ count + " users");
		res.render("home", {count : count});
	});
});


app.post("/register", function(req,res){
	var person = {
		email : req.body.email
	};
	var query = `INSERT INTO users(email) VALUES("${person.email}")`;
	console.log(query)
	connection.query(query, function(err, result){
		if (err) throw err;
		console.log(result);
		res.redirect("/users");
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

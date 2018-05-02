

require('dotenv').config()
var fs=require('fs');

var express= require('express');
var app=express();

var server=app.listen(process.env.PORT || 3000,listening)

function listening(){
	console.log(`✓ Server is now listening on ${process.env.PORT || 3000}.`)
}

var socket=require('socket.io');
var io=socket(server)

io.sockets.on('connection',newConnection)

function newConnection(socket){
	//console.log("new connection:"+socket.id);

	socket.on('addData',addUserData)

	function addUserData(request){
	//console.log(request)
	var dataUser=JSON.parse(request);

	
	new userEntry(dataUser).save()
    /**.then(item => {
    	console.log("Success saving data")
    response.send("item saved to database");//What for? response not defined in this case.
    })
    .catch(err => {
    	console.log("Error saving data")
      response.status(400).send("unable to save to database");///What for? response not defined in this case.
    });**/

}
}

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;


var nameSchema = new mongoose.Schema({
  "Question1": String,
  "Question2": String,
  "Question3": String,
  "Question4": String,
  "Question5": String,
  "Question6": String,
  "dateEntry": String
});


var userEntry = mongoose.model("userEntry", nameSchema);

var connectionString = "mongodb://" + process.env.MONGO_LOGIN + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_HOST +":" + process.env.MONGO_PORT + "/" + process.env.MONGO_DATABASE

mongoose.connect(connectionString);

app.use(express.static('website'));



var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 1313;
var url = "mongodb://valeri:dodo2110@ds163698.mlab.com:63698/school";
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Insert = require("./private/modules/InsertInDB.js");
var Find = require('./private/modules/FindDB.js');
var FindDB = require('./private/modules/FindDBStarting.js');
var UpDate = require('./private/modules/Update.js');
server.listen(port, function(){
  console.log('Server listening at port %d',port);
});
app.use("/static",express.static("./public"));
app.get("/",function(req,res){
  res.sendfile(__dirname+'/public/html/StartingTheTime.html');
});
app.get("/see",function(req,res){
  res.sendfile(__dirname+'/public/html/ShowingTheTime.html');
});
io.on('connection',function(socket){
  socket.on('Stop',function(data){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to DataBase");
      Insert.insertDocuments(db,data.name,data.minutes,function(){
        db.close();
      });
      
    });  
  
  });
  socket.on('information',function(asked){
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
      Find.findDocuments(db,function(docs){
        console.log(docs);
        io.emit('TimeList',docs);
        db.close();
      });
    });
  });
  socket.on('Find',function(name){
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
      FindDB.findDocuments(db,name,function(docs){
        console.log(docs);
        io.emit('Found',docs);
        db.close();
      });
    });
  });
  socket.on('Stop2',function(data){
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
      UpDate.findDocuments(db,data.name,data.minutes,function(){
        db.close();
      });
    });
  });
});
var app = require('express')();
var http = require('http').createServer();
var porter = process.env.PORT || 3000; 

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

http.listen(porter, function(){
  console.log('listening on *: ' + porter);
});

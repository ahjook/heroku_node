var app = require('express')();
var http = require('http').createServer();
var port = process.env.PORT || 3000 

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

http.listen(port, function(){
  console.log('listening on *:3000');
});

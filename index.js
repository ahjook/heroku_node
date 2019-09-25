var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3001;

http.listen(port, function(){
console.log('listening on *:' + port);
   });
app.get('/', function(req, res) {
   res.sendfile('index.html');
});

users = [];


io.on('connection', function(socket) {
   socket.username = "Anonymous";
  console.log('A user connected');
   socket.on('setUsername', function(data) {
      //console.log(data);
     socket.username = data.username;
      if(users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         // users.push(data);
         socket.emit('userSet', {username: data});
      }
   });
   socket.on('online',function(names){
      if(!users.includes(names)){
      users.push(names);
      console.log(names)
      console.log(users)
      io.emit('online',users);
      }

   })
   socket.on('msg', function(data) {
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   })
   socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    //console.log(msg)
  });
   socket.on('typing', function () {
    socket.broadcast.emit('typing', { username: socket.username })
    })
    socket.on('disconnect',function(data){
       var i = users.indexOf(data);
       users.splice(i,1);
       io.emit('online',users);
    })

});
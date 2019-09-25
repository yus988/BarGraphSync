var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
const PORT = process.env.PORT || 3000 //環境変数orPort4000
var server = app.listen(PORT, function(){
    console.log('listening to requests on port ' + PORT)
});

// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

var count = 0;

//io.on→socketが接続されている間
io.on('connection',function(socket){
    console.log('made socket connection', socket.id);
    
    //新しくつながったクライアントにcountの値を同期
    socket.emit('tc2front',count)

    //tc = tell count
    socket.on('tc2server',function(data){
        count = data
        io.emit('tc2front',count)//ioにつながっている全員に送信
        console.log(count)
    })

});

// socket.on('chat', function(data){
//     console.log(data)
//     io.sockets.emit('chat', data);
// });

// socket.on('typing',function(data){
//     socket.broadcast.emit('typing',data)
// })
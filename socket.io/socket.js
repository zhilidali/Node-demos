var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
	fs.readFile('./index.html',function(err, data) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(data, 'utf-8');
	});
}).listen(3000, '127.0.0.1');
console.log('服务运行在http://127.0.0.1:3000');

//将Socket.IO绑定到服务器
var io = require('socket.io').listen(server);

//让Socket.IO对特定事件和客户端消息做出响应
io.sockets.on('connection', function(socket) {
	console.log('客户端连接');
	socket.emit('newmessage', {text:"只要客户端连接，就将数据发送到每个新的客户端"});
	socket.broadcast.emit('oldmessage', {text:"将数据广播给所有已连接的客户端"});

	socket.on('disconnect', function() {
		console.log('客户端断开');
	});
});

var http = require('http');
var fs = require('fs');
var count = 0;//用于存储站点访问者数量的实时统计数据

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
	count++;
	socket.emit('users', {number: count});//只要客户端连接，就将数据发送到每个新的客户端
	socket.broadcast.emit('users', {number: count});//将数据广播给所有已连接的客户端

	socket.on('disconnect', function() {
		console.log('客户端断开');
		count--;
		socket.broadcast.emit('users', {number: count});
	});

	//接收客户端消息，并发送到其他客户端
	socket.on('usermsg', function (msg) {
		socket.broadcast.emit('pushusermsg', msg);
	});

	/*双向数据*/
	//服务器端发送ping，接收客户端的pong
	setInterval(function() {
		console.log('发送PING到客户端');
		socket.emit('ping', { text: 'PING' });
	}, 10000);
	socket.on('pong', function (data) {
		console.log('收到PONG响应，PONG!');
	});

	socket.on('ping', function (data) {
		console.log('收到PING，发送PONG');
		socket.emit('pong', { text: 'PONG' });
	});
});

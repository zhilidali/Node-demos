var http = require('http');
var server = http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('socket.io 示例', 'utf-8');
}).listen(3000, '127.0.0.1');
console.log('服务运行在http://127.0.0.1:3000');

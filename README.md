+ # Node
	0. [模块的历程](//github.com/zhilidali/newmodule)
	1. [Socket.io](socket.io)
	2. [JSON API](JSON%20API)
	3. [Process进程模块](Process)
	4. [child_process子进程](child_process)
	5. [assert断言](assert)QA测试

+ ## 书单阅读：

	* 《Node.js开发指南》
	* 《Node.js入门经典》
	* 《Node与Express开发》
	* 《Node即学即用》
	* 《Node.js实战》
	* 《深入浅出Node.js》

+ ## Node 能够实时响应高并发请求的平台`I/O密集型`

	* `DIRT程序`:数据密集型实时`data-intensive real-time`程序
	* JavaScript是单线程(串行) 事件处理器在线程空闲之前不会运行。
	* 采用event-driven事件驱动（用事件轮询）和非阻塞式异步I/O（异步式I/O 非阻塞式I/O）
	* 使用事件循环(事件队列)和回调是支持异步代码并解决并发问题的高效方式，

+ ## 调试

	- ###	1. REPL: 交互式命令行解析器`Read-Evaluate-Print-Loop` 输入-求值-输出 循环

		*	快捷键:
			*	`ctrl + c` 退出当前终端。
			*	`ctrl + c` 按下两次 - 退出解析器
			*	`ctrl + d` 退出Node REPL
			*	`向上/向下`查看输入的历史命令
			*	`Tab`		列出当前命令
		*	以`.`开头的元命令
			*	`help`列出使用命令
			*	`break` `clear`清除内存中任何变量或闭包，无需重启解析器
			*	`exit`将退出Node解析器
			*	`save filename`保存当前的 Node REPL 会话到指定文件
			*	`load filename`载入当前 Node REPL 会话的文件内容。

	- ###2. Node调试器：

		*	设置断点debugger，运行 `$ node debug app;`
		*	`cont`继续执行
		*	`repl`启动REPL,允许查看变量值和执行代码
		*	`next,n`下一步：跳到下一个语句
		*	`step,s`步入：如果是函数就进入当前执行函数中语句，否则跳过
		*	`out,o`步出：跳出当前执行函数
		*	`backtrace`显示当前调用执行帧或调用栈
		*	`watch(expr)`向观察列表中添加表达式，这样在调试器中进入函数或者移动时会显示出来。
		*	`list(n)`列出调试器中当前停止行的前面和后面的n行代码。

	- ###3. Node探查器：Inspector：`$ npm install -g inspector`

		1.	用`--debug`或 `--debug-brk`的标志启动应用程序，以调试模式运行
		2.	另一终端运行 `$ node-inspector&`
		3.	Webkit浏览器打开 http://127.0.0.1:8080/?port=5858

+ ## CommonJS 模块规范与Node模块的实现

	- ### Node模块机制

		1. 模块定义
			*	exports 对象用于导出当前模块的方法或变量
			*	module 对象，代表模块自身，exports 是 module 的属性
			*	在Node 中，一个文件就是一个模块
		2. 模块标识:传递给`require()`的参数，小驼峰命名
		3. 模块引用：核心模块，文件模块
			**`require()`方法接受模块标识，以此引入一个模块的API到当前上下文中**
			* `路径分析`模块标识符分析 模块路径
				*	`核心模块`优先级仅次于缓存加载，加载过程最快
				*	`路径形式文件模块`.或..开始的相对路径、以`/`开始的绝对路径速，度慢于核心模块
				*	`非路径形式的文件模块`
			* `文件定位`
				1.文件扩展名分析 .js .json .node
				2.目录分析和包
			* `编译执行`
				*	`.js文件`通过fs模块同步读取后编译执行，头尾包装
					*	`(function (exports, require, module, __filename, __dirname) {\n, \n});`
				*	`.node文件`用C/C++编写的扩展文件，通过dlopen()方法加载最后编译成生成的文件
				*		`json文件`通过fs模块同步读取后，用JSON.parse()解析
				*		`.其他扩展名文件`都被当做.js文件载入

 	- ### AMD规范

		```javascript
			define([id], [dependences], factory)
		```

	- ### CMD规范

		```javascript
			define(['dep1', 'dep2'], function (dep1, dep2) {
				return function () {};
			});
		```

	- ### `包结构`组织包中各种文件

		*	一个存档文件，即一个目录直接打包为.zip或tar.gz格式的文件，安装后解压还原为目录
			*	`package.json`包描述文件
			*	`bin`存放可执行二进制文件
			*	`lib`存放JS代码
			*	`doc`存放目录
			*	`test`存放单元测试用例的代码
			*	`examples`存放如何使用模块的实际示例目录
			*	`man`存放模块的任何手册页目录
			*	`src`存放源文件的文件夹，常用于CoffeeScript文件
			*	`.gitignore`从Git库忽略的文件清单
			*	`.npmignore`在npm注册库忽略的文件清单
			*	`LICENSE`模块授权文件
			*	`README.md

	- ### 模块开发

		* #### 创建一个返回`Hello World`的hello()函数的module_name模块

			1. `$ npm init;`
			2. `$ npm link;`会将模块全局安装,模块名称采用package.json中给出的名称
			3. 添加主文件`lib/module_name.js`

				```javascript
					exports.hello = function() {
					return "Hello World";
					};
				```
				*	更新package.json

				```json
					"main": "./lib/module_name.js
				```

			4.	`test/test_assert.js`

				```javascript
					var assert = require('assert');
					var module_name = require('../lib/module_name.js');

					/*
					* 测试hello()是否返回正确的字符串
					*/
					assert.equal(
					module_name.hello(),
					"Hello World",
					"期待： 'Hello World',得到： "+ module_name.hello()
					);
				```
				*	更新packages.json，`$ npm test;`,

				```json
							"script": {
							"test": "node ./test/test_assert.js"
							}
				```

+ ## Node.js核心模块

	- ### Global Object全局对象：`global`全局变量的宿主

		+	全局变量:最外层定义变量/"全局对象属性"/"隐式定义变量";

		+ ####`console`用于提供控制台标准输出

			*	`console.log()`向标准输出流打印字符并以换行符结束
			*	`console.error()`向标准错误流...
			*	`console.trace()`向标准错误流输出当前的调用栈
		+ ####`process` 进程:描述当前Node.js进程状态的对象，提供了一个与操作系统的简单接口
			*	`process.cwd()`获取程序当前目录
			*	`process.chdir('目录')`改变应用程序目录
			*	`process.argv`命令行参数数组 ["node", "script.js", "--v"...]
			*	`process.stdout`标准输出流process.stdout.write()
			*	`process.stdin`标准输入流
			*	`process.stderr`标准错误流
			*	`process.exit(code)`在程序内杀死进程，退出程序，code为返回的代码，默认为0
			*	`process.on()`监听事件进程 "exit","uncaughtException","SIGINT"
			*	`process.nextTick(callback)`为事件循环设置一项任务
			*	`process.env.SOMETHING`
				*	设置环境变量
					*	`SET SOMETHING='12345';`Window
					*	`export SOMETHING='123456'`UNIX

		+ ####`Buffer` 缓冲区：处理二进制数据的方式，对原始内存的分配
			- 全局变量类型，是一个比较罕见的不需要 require('buffer') 就可以使用的类

			- #####示例场景

				*	通过TCP连接和接收数据
				*	从图像或者压缩文件读取二进制数据
				*	从文件系统读写数据
				*	处理来自网络的二进制数据流

			- #####	创建 Buffer 类

				*	`var buffer = new Buffer(10);`创建一个带有10个字节的新缓冲区
				*	`var buffer = new Buffer([10, 20, 30 ,40, 50]);`
				*	`var buffer = new Buffer("github.com/zhilidali", "utf-8");`

			- #####	语法

				*	`buffer.write(string[, offset[, length]][, encoding])`写入缓冲区
					*	`string`写入缓冲区的字符串
					*	`offset`缓冲区开始写入的索引值，默认为0
					*	`length`写入的字节数，默认为buffer.length
					*	`encoding`使用的编码，默认为'utf-8'
					*	`返回值`返回实际写入的大小，吐过buffer空间不足，则只会写入部分字符串
				*	`buffer.toString([encoding[, start[, end]]])`从缓冲区读取数据
					*	`encoding`使用的编码，默认为utf8
					*	`start`指定开始读取的索引位置，默认为0
					*	`end`结束位置，默认为缓冲区的结尾
					*	`返回值`解码缓冲区数据并使用指定的编码返回字符串
				*	`buffer.toJSON()`将 Buffer 转换为 JSON对象
				*	`Buffer.concat(list[, totaLength])`缓冲区合并
					*	`list`用于合并的Buffer对象数组列表
					*	`totalLength`指定合并后Buffer对象的总长度
					*	返回一个多个成员合并的新 Buffer 对象
				*	`buffer.compare(otherBuffer)`缓冲区比较,返回一个数字
				*	`buffer.copy(bufferToCopyTo)`拷贝缓冲区，buffer是要被复制的Buffer对象
				*	`buffer.slice()`裁剪缓冲区
				*	`buffer.length`缓冲区长度
			-	`Buffer.isEncoding(encoding)`
			-	`Buffer.isBuffer(obj)`
			-   `Buffer.byteLength(str)获得字符串在编码上的字节长度`

	- ### `Util`实用工具：提供常用函数集合，弥补JS的功能过于精简的不足

		*	util.inherits(constructor, superConstrctor)//实现对象间原型继承

			```javascript
				var util = require('util');//引用模块
				function Base() {//Base类
					this.name = 'base';
					this.base = 1991;
					this.sayHello = function() {
						console.log('Hello '+ this.name);
					}
				}
				Base.prototype.showName = function() {
					console.log(this.name);
				}
				function Sub() {
					this.name = 'sub';
				}

				var objBase = new Base();
				objBase.showName();//base
				objBase.sayHello();//Hello base
				console.log(objBase);//{ name:'base', base: 1991, sayHello:[Function]}

				util.inherits(Sub, Base);//Sub继承Base
				var objSub = new Sub();
				objSub.showName();//sub
				//objSub.sayHello();
				console.log(objSub);//{ name: 'sub'}
			```

		*	util.inspect(object, [showHidden], [depth], [colors])//将任意对象转换为字符串，常用于调试和错误输出
			*	showHidden：true将会输出更多隐藏信息
			*	depth：最大递归层数，如果不指定depth，默认递归2层，指定为 null 表示将不限递归层数完整遍历对象。
			*	如果color 值为 true，输出格式将会以 ANSI 颜色编码，通常用于在终端显示更漂亮的效果。

				```javascript
					var util = require('util');
					function Person() {
						this.name = 'zhilidali';
						this.toString = function() {
							return this.name;
						}
					}
					var obj = new Person();

					console.log(util.inspect(obj));
						//{ name: 'zhilidali', toSring: [Function] }
					console.log(util.inspect(obj, true));
				```

		*	util.isArray()/util.isRegExp()/util.isDate()/util.isError()
		*	util.format()/util.debug()

	- ### `Events`事件驱动：可为事件设置监听器和处理器

		*	客户端相比，Node.js中更常见为网络事件
			1. 服务器的响应
			2. 从文件读取数据
			3. 从数据库返回数据
		*	events.EventEmitter//事件发射与事件监听功能的封装
			*	EventEmitter.on(event, listener)//为指定事件注册一个监听器
			*	EventEmitter.emit(event, [arg1], [arg2], [...])//发射事件
			*	EventEmitter.once(event, listener)//为指定事件注册一个单次监听器
			*	EventEmitter.removeListener(event, listener)//移除指定事件的某个监听器
			*	EventEmitter.removeAllListener([event]);//移除[所有]事件的所有监听器

				```javascript
					var EventEmitter = require('events').EventEmitter;
					var emitter = new EventTmitter();
					emitter.on('someEvent', function(arg1, arg2) {
						console.log('listener1', arg1, arg2);
					});
					emitter.on('someEvent', function(arg1, arg2) {
						console.log('listener2', arg1, arg2);
					});
					emitter.emit('someEvent', 'byvoid', 1991);
				```

		*	error 事件

	- ### `url`

		* `url.parse("URL", boolean)`解析URL，返回一个json格式的数组
			{
				href: '用来解析的原始完整URL',
				protocol: '协议',
				host: 'auth+hostname+port',
				auth: '用户证书'
				hostname: '主机名',
				port: '端口',
				pathname: '文件路径',
				search: 'URL中HTTP GET 的参数',
				query: 'parse第二个参数为true为对象，否则为字符串',
				hash: '哈希值',
			}
		* `url.format()`
		* `url.resolve()`

	- ### `path`

		`path.normalize()`将不规范的路径格式化为标准路径
		`path.join()`组合路径
		`path.dirname()`返回路径中的目录名
		`path.basename()`可返回路径中的最后一部分
		`path.extname()`返回路径中文件的扩展名

	- ### `querystring`

		`querystring.parse()`解析query字符串,数字是返回成字符串
		`querystring.decode()`输入的key-value格式的对象转换成query字符串的格式
		`querystring.stringify()`
		`querystring.escape()`
		`querystring.unescape()`
		`querystring.unescapeBuffer()`

	- ### `HTTP` 服务器与客户端

		+ #### `HTTP服务器`
			1. `http.Server`一个基于事件的 HTTP 服务器
				* `request`客户端请求到来时，该事件被触发
					* http.createServer([requestListener]),是 http 的一个捷径
					* 功能是创建一个 HTTP 服务器并将requestListener 作为 request 事件的监听函数

						```javascript
							var http = require('http');
							var server = new http.Server();
							server.on('request', function (req, res) {
								res.writeHead(200, {'Content-Type' : 'text/html'})
								res.write('<h1>Node.js</h1>')
								res.end('<p>Hello World</p>')
							});
							server.listen(3000);
						```

				* `connection`当TCP连接建立时，该事件被触发，提供一个socket参数，为net.Socket的实例
				* `close`当服务器关闭时，事件触发
			2. `http.ServerRequest`HTTP 请求的信息
				`data`当请求到来时，该事件被触发，chunk参数表示接收到的数据
				`end`当请求体数据传输完成时，该事件被触发
				`close`用户当前请求结束时，该事件被触发
			3. 获取GET 请求内容
				通过url.parse手动解析路径中内容
			4. 获取Post 请求内容
			5. `http.ServerResponse`返回给客户端的信息
				`response.writeHead(statusCode, [headers])`向请求的客户端发送响应头
				`response.write(data, [encoding])`向请求的客户端发送响应内容
				`response.end([data], [encoding])`结束响应，告知客户端所有发送已经完成
		+ #### `HTTP 客户端`
			* `http.request(options,callback)`发起HTTP请求，返回一个http.ClientResponse的实例
				* `options`类关联数组对象
					* `host`： 请求的域名或IP地址
					* `port`： 请求网站的端口，默认为80
					* `method`： 请求方法，默认是GET
					* `path`： 请求的相对于跟的路径，默认是"/"
					* `headers`：一个关联数组对象，为请求头的内容
				* `callback`回调函数，为http.ClientResponse的实例
			* `http.get(options, callback)`

	- ### `Stream` 流：Node移动数据的方式:大数据情况下必须使用流式处理

		* 三个主要流：标准输入／标准输出／标准错误
		* “比如用流读写文件数据时，由于数据是流，意味着在完成文件读取之前，从最初收到几个字节开始，就可以对数据进行操作”
		*
			* var stream = require('stream')
			* var Readable = stream.Readable
			* var Writable = stream.Writable
			* var Duplex = stream.Duplex
			* var Transform = stream.Transform
		使用Stream可实现数据的流式处理，如：

			```javascript
				var fs = require('fs')
				// `fs.createReadStream`创建一个`Readable`对象以读取`bigFile`的内容，并输出到标准输出
				// 如果使用`fs.readFile`则可能由于文件过大而失败
				fs.createReadStream(bigFile).pipe(process.stdout)
			```

		Readable 可读流

	- ### `fs`文件系统

		*	`fs.writeFile(filename, data, callback)`写入文件
		*	`fs.appendFile(filename, data, [encoding], [callback(err)]);`追加写入
		*	`fs.exists(filename, [callback(exists)])`是否存在，回调唯一参数:文件是否存在的布尔值
		*	`fs.rename(oldfile, newfile, [callback()])`修改名称
		*	`fs.readFile(filename, [encoding], [callback(err, data)])`fs.readFileSync(filename, [encoding])
		*	`fs.open(path, flags, [mode], [callback(err, fd)])`
			*	`flags`
				*	`r`	以读取模式打开文件。
				*	`r+`	以读写模式打开文件。
				*	`w`	以写入模式打开文件，如果文件不存在则创建。
				*	`w+`	以读写模式打开文件，如果文件不存在则创建。
				*	`a`	以追加模式打开文件，如果文件不存在则创建。
				*	`a+`	以读取追加模式打开，如果文件不存在则创建。
			*	`mode`参数用于创建文件时给文件指定权限，默认是 0666
		*	`fs.read(fd, buffer, offset, length, position, [callback(err, byteRead, cuffer)])`指定的文件描述符 fd 中读取数据并写入 buffer 指向的缓冲区对象

	- ### `child_process` 子进程

		*	场景：
			*	复杂等式计算
			*	使用位于node外部的基于系统工具操作数据
			*	执行资源密集型或花费大量时间来完成的操作
			*	执行清理操作

		1. `spawn()` 使用系统命令 启动一个子进程来执行命令
			* Command想要运行的命令
			* Arguments传递给命令的任何参数
			* options诸如工作目录和环境变量这样的东西

				```javascript
					var spawn = require('child_process').spawn;
					var ping = spawn('ping', [bbc.co.uk]);//生成ping工具的子进程
					ping.stdout.setEncoding('utf8');
					//对子进程侦听，处理从标准输出接收到的数据
					ping.stdout.on('data', function(data) {
						console.log(data);
					});
					//父进程可侦听子进程的退出事件并做一些处理
					ping.on('exit', function(code, signal) {
						console.log('子进程被'+signal+'信号杀死');
					});
					ping.kill("SIGINT");//从父进程发送kill信号给子进程
				```

		2. `exec()`
		3. `execFile()`启动一个子进程来执行可执行文件
		4. `fork()` 与子进程通信 //创建一个也是Node.js进程的子进程，并提供父子进程通信能力
			* 父Node程序

				```javascript
					var fork = require('child_process').fork;
					var child = fork(__dirname + '/child.js');
					child.on('message', function(m) {
						//在父进程侦听消息进行处理
					});
					child.send({message: 'Hello child'});//从父进程发送消息给子进程
				```

			* child.js程序

				```javascript
					process.on('message', function(m) {
						//在子进程侦听消息进行处理
					});
					process.send({message: "Hello parent"});
				```

	- ### `Cluster` 集群

		```javascript
			var cluster = require('cluster');
			cluster.fork();
			cluster.on('death', function(){
				console.log('子进程'+worker.pid+'死掉')
			})
		```

	- ### `assert`断言

		`var assert = require('assert');`
		* assert.equal(a, b "异常抛出时显示可选");
		* assert.Equal();
		* assert.strictEqual();

+ ## Node.js重要扩展模块

	- ### `Scoket.io` 套接字

		*	WebSocket 基本思想是在Web服务器和浏览器之间保持连接持久打开
			使服务器和浏览器可以推送数据，数据交换快
		*	Socket.IO 提供通过WebSocket进行通信的一种简单方式

	- ### `Connect`Node的"插件"库，创造了“中间件”`middleware`来描述插入式的Node模块

	- ### `Express`Web 程序框架

		* 使用 Scaffold脚手架 快速构建,生成套路化代码
			* `$ npm install -g express && npm install -g express-generator`
			* `$ express -e website;`建立工程，目录app.js、package.json、public、routes、views
			* `$ cd website && npm install;`进入工程安装依赖
			* `$ npm start;`启动
			* 浏览器访问localhost:3000
		* `中间件`处理HTTP请求 的 函数
			中间件是有3个参数的函数：请求对象、响应对象、next函数
		* API
			* `var express = require('express');`
			* `var app = express();`
			* `app.get(path,function(req, res){})`根据请求路径来处理客户端发出的GET请求
				Routing路由是指向客户端提供它所发出的请求内容的机制
				* 请求对象:Node核心对象`http.IncomingMessage`的示例
					*	`req.params`包含 命名过的路由参数的数组
					*	`req.params(name)`返回命名的路由参数
					*	`req.query`对象，包含以键值对存放的查询字符串参数
					*	`req.body`对象
					*	`req.route`用于路由调试
					*	`req.cookies/req.singnedCookies`
					*	`req.headers`
					*	`req.accepts([types])`
					*	`req.ip`
					*	`req.path`请求路径
					*	`req.xhr`如果请求由Ajax 发起将会返回true。
					*	`req.protocol`协议
					*	`req.secure`
					*	`req.url/req.originalUrl`
					*	`req.acceptedLanguages`
				* 响应对象:Node核心对象http.ServerResponse的实例
					* res.status(code)
					* res.set(name,value)
					* res.cookie
					* res.redirect([status],url)
						* 301永久移动
						* 302
						* 303 响应表单提交
			* `app.all()`可匹配所有HTTP动词，作用是对于一个路径上的所有请求加载中间件
		* `app.use([path], function(req, res, next){});`
			* `req.path`
			* `req.query.参数名`
			* `req.param("参数名")`
			* `req.params.参数名`
			* `res.send([body|status], [body]);`

	- ### [Underscore](http://github.com/documentcloud/underscore)

		```jacascript
			var arr = [1, 2, 3];
			_each(arr, function(n) {
				console.log(n);
			});
		```

	- [CoffeScript]('http://github.com/jashkenas/coffee-script');
	- [Request]('http://github.com/mikeal/request');
	- [Optimist]('http://github.com/substack/node-optimist');
	- Chai 断言库

+ ## 知识点

	- ### 调试

	- ### 测试
		单元测试和集成测试

		* 无头浏览器`Selenium`、`PhantomJS` 和`Zombie`
		* `Nodeunit`

			```javascript
				exports.testName = function(test) {//testName是测试的描述
					test.export(n);//期望的断言数
					test.strictEqual('hello', 'hello');
					test.done();//表示测试完成
				}
			```

		* BDD行为驱动开发
			* `Vows`
				* Vows用平白语句描述功能
					* Description 描述：测试套组的描述
					* Context 上下文：测试运行的上下文
					* Topic 主题：要测试的是什么
					* Vow 宣告：期望在测试中发生的是什么

				```javascript
					var vows = require('vows'),
					assert = require('assert');

					vows.describe('比较字符串').addBatch({//Description
						'当字符串相等时': {//Context
							topic: "hello",//Topic
							'他们应该相等': function (topic) {//Vow
								assert.strictEqual (topic, "hello");
							}
						},
						'当字符串不等时': {
							topic: "hello",
							'他们应该不等': function (topic) {
								assert.notStrictEqual (topic, "there");
							}
						}
					}).run();
				```

			* `Mocha`

				```javascript
					var assert = require('assert');
					describe('比较字符串', function(){
						describe('当字符串相等时', function(){
							it('应该返回true', function(){
								assert.strictEqual ("hello", "hello");
							})
						})
						describe('当字符串不等时', function(){
							it('应该返回false', function(){
								assert.notStrictEqual ("hello", "there");
							})
						})
					})
				```
		* TDD测试驱动开发

	- ### `REST`表征状态转移(Representational State Transfer)

		* Web服务: 指任何可以通过HTTP访问的应用程序编程接口API
		* HTTP谓词verb

	- ### 数据持久化

		* 数据存储方法
			* 保存在硬盘或闪存盘上//文件系统持久化
			* 保存在计算机内存中
				`process.env.SOMETHING`
			* 保存在数据库中
			* 保存在cookie或会话中

	- ### Template Engine 模板引擎//从页面模板根据一定规则生成 HTML工具

		* 模板视图引擎 `Jade`、`Handlebars`、`ejs`
			* `ejs`系统标签//Embedded JavaScript
				* `<% code %>`JS代码
				* `<%= code %>`显示替换过HEML特殊字符的内容
				* `<%- code %>`显示原始HTML内容
			* `Handlebars`
				* `context`上下文对象：渲染模板时传递给模板引擎的对象，替换标识
				* {{! 此处是注释}}
				* 块级表达式: 提供了流程控制、条件执行和可扩展性
		* `layout`布局（母版页）
		* `Partials`片段视图/局部模板/局部文件
		* `section`段落
		* 视图助手
		* 服务器端模板
			隐藏实现细节、支持模板缓存（开发模式禁用）app.set('view cache',true);
		* 客户端模板

	- ### 部署

		* 云托管 平台即服务(`Platform as a Server`,`Paas`)
			云计算的基本思想：数据不是存储在自己硬件上，而是存储在别人硬件上
		* `Heroku`

	- ### 工具

		* windows命令行工具`Console2`
		* Windows版的[cURL](https://curl.haxx.se/download.html) 找到Win32-Generic"区域
			最好选择支持SSL和SSH功能的版本（如跳转另一页面，点击"Download WITHSUPPORT SSL"），
			解压文件，将curl.exe放到PATH路径下或者用户目录

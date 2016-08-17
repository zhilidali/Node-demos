0. [创建模块](module_name)
1. [Socket.io](socket.io)
2. [JSON API](JSON%20API)
3. [Process进程模块](Process)
4. [child_process子进程](child_process)
5. [assert断言](assert)QA测试

##	书单阅读：
*	《Node.js开发指南》
*	《Node.js入门经典》
*	《Node与Express开发》
*	《Node即学即用.pdf》
*	《Node.js实战》
*	《Node.js实战》
*	《深入浅出Node.js》

##	Node 能够实时响应大量并发用户(高并发)请求的平台`I/O密集型`
*		`DIRT程序`:数据密集型实时`data-intensive real-time`程序
*		采用事件驱动（用事件轮询）和非阻塞式异步I/O（异步式I/O 非阻塞式I/O）
*		JavaScript是单线程(串行) 事件处理器在线程空闲之前不会运行。
*		使用事件循环(事件队列)和回调是支持异步代码并解决并发问题的高效方式，
*		路由是指向客户端提供它所发出的请求内容的机制
*		window命令行工具Console2

## 调试
###	1. REPL 交互式命令行解析器//(Read-eval-print loop) 输入-求值-输出 循环
*	快捷键:
*	`ctrl + c` 退出当前终端。
*	`ctrl + c` 按下两次 - 退出解析器
*	`ctrl + d` 退出Node REPL
*	`向上/向下`查看输入的历史命令
*	`Tab`		列出当前命令
*	以`.`开头的元命令
*	`help`列出使用命令
*	`break` `clear`清除内存中任何变量或闭包，不需要重启解析器
*	`exit`将退出Node解析器
*	`save filename`保存当前的 Node REPL 会话到指定文件
*	`load filename`载入当前 Node REPL 会话的文件内容。

###2. Node调试器：
*	设置断点debugger，运行 `$ node debug app;`
*	`cont`继续执行
*	`repl`启动REPL,允许查看变量值和执行代码
*	`next,n`下一步：跳到下一个语句
*	`step,s`步入：如果是函数就进入当前执行函数中语句，否则跳过
*	`out,o`步出：跳出当前执行函数
*	`backtrace`显示当前调用执行帧或调用栈
*	`watch(expr)`向观察列表中添加表达式，这样在调试器中进入函数或者移动时会显示出来。
*	`list(n)`列出调试器中当前停止行的前面和后面的n行代码。

###3. Node探查器：
*	Inspector：`$ npm install -g inspector`
1.	用`--debug`或 `--debug-brk`的标志启动应用程序，以调试模式运行
2.	另一终端运行 `$ node-inspector&`
3.	Webkit浏览器打开 http://127.0.0.1:8080/?port=5858

## CommonJS 模块规范与Node模块的实现
###	1. 模块定义
*		exports 对象用于导出当前模块的方法或变量
*		module 对象，代表模块自身，exports 是 module 的属性
*		在Node 中，一个文件就是一个模块

### 2. 模块标识:传递给`require()`的参数，小驼峰命名
### 3. 模块引用：核心模块，文件模块
`require()`方法接受模块标识，以此引入一个模块的API到当前上下文中

#####	`路径分析`模块标识符分析 模块路径
*			`核心模块`优先级仅次于缓存加载，加载过程最快
*			`路径形式文件模块`.或..开始的相对路径、以`/`开始的绝对路径速，度慢于核心模块
*			`非路径形式的文件模块`

#####	`文件定位`
1.			文件扩展名分析 .js .json .node
2.			目录分析和包

#####	`编译执行`
*				`.js文件`通过fs模块同步读取后编译执行，头尾包装
				`(function (exports, require, module, __filename, __dirname) {\n, \n});`
*				`.node文件`用C/C++编写的扩展文件，通过dlopen()方法加载最后编译成生成的文件
*				`json文件`通过fs模块同步读取后，用JSON.parse()解析
*				`.其他扩展名文件`都被当做.js文件载入

###	AMD规范
`define([id], [dependences], factory)`

###	CMD规范
```javascript
	define(['dep1', 'dep2'], function (dep1, dep2) {
		return function () {};
	});
```
###	`包结构`组织包中各种文件
#####	一个存档文件，即一个目录直接打包为.zip或tar.gz格式的文件，安装后解压还原为目录
*			`package.json`包描述文件
*			`bin`存放可执行二进制文件
*			`lib`存放JS代码
*			`doc`存放目录
*			`test`存放单元测试用例的代码
*
*			`examples`存放如何使用模块的实际示例目录
*			`man`存放模块的任何手册页目录
*			`src`存放源文件的文件夹，常用于CoffeeScript文件
*			`.gitignore`从Git库忽略的文件清单
*			`.npmignore`在npm注册库忽略的文件清单
*			`LICENSE`模块授权文件
*			`README.md

###	模块开发
####	创建一个返回`Hello World`的hello()函数的module_name模块
1.		`$ npm init;`
2.		`$ npm link;`会将模块全局第安装在计算机上，模块名称采用package.json中给出的名称
3.		添加主文件lib/module_name.js,更新package.json中`"main": "./lib/module_name.js`。
			```exports.hello = function() {
			return "Hello World";
			};```
4.		`test/test_assert.js`

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
*		更新packages.json，`$ npm test;`

```json
			"script": {
			"test": "node ./test/test_assert.js"
			}
```

## Node.js核心模块
###  Global Object全局对象：`global`全局变量的宿主
*			全局变量:最外层定义变量/"全局对象属性"/"隐式定义变量";

####	`console`用于提供控制台标准输出
*			`console.log()`向标准输出流打印字符并以换行符结束
*			`console.error()`向标准错误流...
*			`console.trace()`向标准错误流输出当前的调用栈

####	`process` 进程:描述当前Node.js进程状态的对象，提供了一个与操作系统的简单接口
*			`process.cwd()`获取程序当前目录
*			`process.chdir('目录')`改变应用程序目录
*			`process.argv`命令行参数数组 ["node", "script.js", "--v"...]
*			`process.stdout`标准输出流process.stdout.write()
*			`process.stdin`标准输入流
*			`process.stderr`标准错误流
*			`process.exit(code)`在程序内杀死进程，退出程序，code为返回的代码，默认为0
*			`process.on()`监听事件进程 "exit","uncaughtException","SIGINT"
*			`process.nextTick(callback)`为事件循环设置一项任务
*			`process.env.SOMETHING`
	*			设置环境变量
		*			`SET SOMETHING='12345';`Window
		*			`export SOMETHING='123456'`UNIX

####	`Buffer` 缓冲区：处理二进制数据的方式，对原始内存的分配
全局变量类型，是一个比较罕见的不需要 require('buffer') 就可以使用的类
#####		示例场景
*				通过TCP连接和接收数据
*				从图像或者压缩文件读取二进制数据
*				从文件系统读写数据
*				处理来自网络的二进制数据流

#####		创建 Buffer 类
				var buffer = new Buffer(10);//创建一个带有10个字节的新缓冲区
				var buffer = new Buffer([10, 20, 30 ,40, 50]);
				var buffer = new Buffer("github.com/zhilidali", "utf-8");
#####		语法
*				buffer.write(string[, offset[, length]][, encoding])//写入缓冲区
	*				`string`写入缓冲区的字符串
	*				`offset`缓冲区开始写入的索引值，默认为0
	*				`length`写入的字节数，默认为buffer.length
	*				`encoding`使用的编码，默认为'utf-8'
	*				`返回值`返回实际写入的大小，吐过buffer空间不足，则只会写入部分字符串
*				buffer.toString([encoding[, start[, end]]])//从缓冲区读取数据
	*				`encoding`使用的编码，默认为utf8
	*				`start`指定开始读取的索引位置，默认为0
	*				`end`结束位置，默认为缓冲区的结尾
	*				`返回值`解码缓冲区数据并使用指定的编码返回字符串
*				buffer.toJSON()//将 Buffer 转换为 JSON对象
*				Buffer.concat(list[, totaLength])//缓冲区合并
	*				`list`用于合并的Buffer对象数组列表
	*				`totalLength`指定合并后Buffer对象的总长度
	*				返回一个多个成员合并的新 Buffer 对象
*				buffer.compare(otherBuffer)//缓冲区比较,返回一个数字
*				buffer.copy(bufferToCopyTo)//拷贝缓冲区，buffer是要被复制的Buffer对象
*				buffer.slice()//裁剪缓冲区
*				buffer.length//缓冲区长度
*			`Buffer.isEncoding(encoding)`
*			`Buffer.isBuffer(obj)`

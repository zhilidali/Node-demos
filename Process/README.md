# Process进程模块
##1. Node.js运行于一个进程中
当我们运行Node.js程序时，其运行于单个进程之上。
操作系统 给进程 指派 唯一进程id或pid ：`process.pid`

##2. 进程退出 与 进程中错误的事件
###1. 进程退出事件

```javsscript
	process.on('exit', function(){
		//当脚本退出时执行，比如关闭连接的清理操作或需要记录一些日志信息等
	});
```
###2. uncaughtException事件用于脚本未处理的异常

```javsscript
	process.on('uncaughtException', function(){
		//常用于捕获未捕获的异常并将其发送到电子邮件
		console.error(err.stack);
	})
```

##3. 进程与信号signal
1. SIGINT信号:发送中断(Interrupt)信号的缩写
按下CTRL+C，进程收到SIGINT信号

```javsscript
	process.stdin.resume();//防止脚本退出
	process.on('SIGINT', function(){
		console.log("收到SIGINT，退出");
		process.exit(0);
	});
```
##4. 向进程发送信号
`kill [process_id]`默认发送SIGTERM，进程立即终止
`kill -s SIGINT [process_id]`

##5. Process模块创建从终端运行的Node.js脚本
在脚本顶部加一个Node.js的shebang，告诉操作系统从哪来找到运行脚本的二进制程序
>	\#!/user/bin/env node
>	console.log('node 脚本');
>	console.log(process.argv)

1. 将脚本设置为可执行`chmod +x script`(Mac OSX或者Linux)
2. 终端输入`./script [可选参数]`(script为文件名)

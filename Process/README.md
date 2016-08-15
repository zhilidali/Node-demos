当我们运行Node.js程序时，他运行于的单个进程之上。
操作系统给进程指派唯一进程id或pid

## 进程的事件
1. Process模块给进程提出了一个事件
	process.on('exit', function(){
		//当脚本退出时执行，比如关闭连接的清理操作或需要记录一些日志信息等
	});
2. Process模块提供'uncaughtException'事件用于脚本没有处理的异常
	process.on('uncaughtException', function(){
		//常用于捕获未捕获的异常并将其发送到电子邮件
		console.error(err.stack);
	})

## 进程与信号
1. SIGINT信号:发送中断(Interrupt)信号的缩写,CTRL+C
	process.stdin.resume();//防止脚本退出
	process.on('SIGINT', function(){
		console.log("收到SIGINT，退出");
		process.exit(0);
	});

# Process模块创建从终端运行的Node.js脚本
## 在脚本顶部加一个Node.js的shebang，告诉操作系统从哪来找到运行脚本的二进制程序
>	\#!/user/bin/env node
	console.log('node 脚本');

1. 将脚本设置为可执行'chmod +x script'
2. 终端输入'./script'

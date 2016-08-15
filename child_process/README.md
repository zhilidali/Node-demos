# Child Process 子进程
* 子进程就是由另一个进程创建的进程
* 创建子进程的进程成为父进程

##1. 使用子进程场景
1. 计算复杂等式
2. 使用位于Node.js外部 基于系统的工具 来操纵一些数据
3. 执行资源密集型 或 需花费大量时间来完成的操作
4. 想执行清理操作

父进程与子进程之间的接口，数据流可以通过 `stdio标准输入`、`stdout标准输出`、`sterr标准错误` 来交换

##2. 创建子进程
spawn()方法，`使用系统命令 启动一个子进程来执行命令`，参数：
1. Command：想要运行的命令
2. Arguments：传递给命令的任何参数
3. Options： 诸如工作目录和环境变量这样的东西

```javascript
var spawn = require('child_process').spawn;
var ping = spawn('ping', ['bbc.co.uk']);//生成ping工具的子进程
//对子进程侦听，处理从标准输出接收到的数据
ping.stdout.setEncoding('utf8');
ping.stdout.on('data', function (data) {
	console.log(data);
});
```

##3. 杀死子进程kill()

```javascript
//父进程可侦听子进程的退出事件并做一些处理
ping.on('exit', function (code, signal) {
  console.log('子进程被一个 '+ signal + ' 信号杀死');
});
ping.kill('SIGINT');//从父进程发送kill信号给子进程
```

##4. 与子进程通信
fork()方法，`创建一个也是Node.js进程的子进程，并提供父子进程通信能力`
1. `parent.js`创建子进程

```javascript
var fork = require('child_process').fork;
var child = fork(__dirname + '/child.js');

child.on('message', function(m) {
	console.log('父进程收到:', m);
});
//从父进程发送消息给子进程
child.send({ message: 'Hello child!' });
```
2. `child.js`

```javascript
process.on('message', function(m) {
	console.log('子进程收到:', m);
});
//从子进程发送消息给父进程
process.send({ message: 'Hello parent!' });
```
##5 集群Cluster模块
master主进程、worker process工作者进程

```javascript
var cluster = require('cluster');
cluster.fork();
cluster.on('death', function(){
	console.log('子进程'+worker.pid+'死掉')
})
```

#模块开发
创建一个返回`Hello World`的hello()函数的module_name模块
##1. `$ npm init`;
##2. `$ npm link`;会将模块全局第安装在计算机上，模块名称采用package.json中给出的名称
##3. 添加主文件
* `lib/module_name.js`
* 更新package.json

```json
	"main": "./lib/module_name.js"
```

##4. 添加测试文件
* test/test_assert.js加入

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
* 更新packages.json

```json
	"script": {
		"test": "node ./test/test_assert.js"
	}
```
* $ npm test;

##5. 添加可执行文件``
* bin/module_name.js

```javascript
	#!/usr/bin/env node
	var module_name = require('../lib/module_name.js');
	console.log(module_name.hello());
```
* 更新package.json

```json
	"bin": "bin/module_name.js"
```

* `$ npm link`
* `$ module_name`

##6. 面向对象编程
* lib/module_name.js

```javascript
	module.exports = new Module_name();

	function Module_name(){}
	Module_name.prototype.hello = function(){
		return "Hello World";
	};
```

* `$ npm test`

##7. GitHub共享，更新package.json
```json
	"repository": {
		"type": "git",
		"url": "https://github.com/zhilidali/Node-demos/tree/master/module_name"
	},
	"bugs": {
		"email": "1373653244@qq.com",
		"url": "https://github.com/zhilidali/Node-demos/issues"
	},
```

##8. Travis CI 基于云的分布式持续集成（Continuous Integration）服务器
持续集成：每当代码库有变化时就会运行测试
* 注册[Travis CI](http://travis-ci.org)，进入[profile](https://travis-ci.org/profile/zhilidali),打开开关
* 项目中创建.yml文件(Yet Another Markup Language),告诉Travis CI要测试什么以及如何测试

```yml
	language: node_js
	node_js:
	 - 4
```
每次推送到GitHub时，Travis CI就会运行测试并报告是否有问题存在

##9. 发布到npm registry
工作方式：代码会被压缩到一个tar包，然后发送到npm注册库服务器保存
创建注册库账户`$ npm adduser`
发布模块`$ npm publish`
更新版本`$ npm version 1.0.1`

##10 通过其他地方公开模块
* [Node.js Google Groups](http://groups/google.com/group/nodejs)
* irc.freenode.net的#node.js通道上的IRC
* 使用#nodejs井号标签在Twitter上发布

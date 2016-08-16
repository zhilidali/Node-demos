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

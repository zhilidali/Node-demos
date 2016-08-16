#模块开发
创建一个返回`Hello World`的hello()函数的module_name模块
##1. $ npm init;
##2. $ npm link;会将模块全局第安装在计算机上，模块名称采用package.json中给出的名称
##3.
###1. 安装惯例,在lib文件夹中添加一个与模块一样名称的文件
###2. package.json中`"main": "./lib/module_name.js`
###3. test/test_assert.js
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
###4. packages.json
	"script": {
		"test": "node ./test/test_assert.js"
	}
###5. $ npm test;

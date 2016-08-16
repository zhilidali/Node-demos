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

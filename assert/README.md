##1. assert断言

```javascript
	var assert = require('assert');
	assert.equal(a, b, "异常抛出时显示可选");
	assert.Equal();
	assert.strictEqual();
```

##2. Nodeunit
```javascript
	exports.testName = function(test) {//testName是测试的描述
		test.export(n);//期望的断言数
		test.strictEqual('hello', 'hello');
		test.done();//表示测试完成
	}
```

##3. BDD行为驱动开发
###1. Vows
Vows用平白语句描述功能
1. Description 描述：测试套组的描述
2. Context 上下文：测试运行的上下文
3. Topic 主题：要测试的是什么
4. Vow 宣告：期望在测试中发生的是什么

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

###2. Mocha

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

##4. TDD测试驱动开发

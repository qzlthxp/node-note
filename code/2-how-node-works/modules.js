// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
const C = require('./test-module-1')
const calc1 = new C()
console.log(calc1.add(2, 5))

// exports
// const calc2 = require("./test-module-2");
const { add, multiply } = require('./test-module-2')
console.log(multiply(2, 5))

// caching
/**
 * Hello from the module 只会执行一次
 * 因为有缓存只会引入一次模块
 * require('./test-module-3')() 掉了三次所以执行三次
 * require('./test-module-3')这个就相当于一个值了
 * require('./test-module-3')第二次和第三次调用也是从缓存中取值的
 */
require('./test-module-3')()
require('./test-module-3')()
require('./test-module-3')()

# module.exports 和 exports的使用区别

1. 首先 `module.exports` 和 `exports` 初始值都为 `{}` ，并且指向同一个内存地址，因此

   ```js
   console.log(module.exports) // {}
   console.log(exports) // {}
   console.log(module.exports === exports) // true
   ```

2. `exports` 只能使用 `.` 语法

   ```js
   // moduleA.js
   exports.a = 123
   
   // test.js
   const {a} = require('./moduleA.js')
   console.log(a) // 123
   ```

   如果使用 `=` 

   ```js
   // moduleA.js
   exports = 123
   
   // test.js
   const obj = require('./moduleA.js')
   console.log(obj) // {}
   ```

    使用 `=` ，则 `require` 之后获取的值为 `{}`。因为模块文件执行完毕只有 `module.exports` 会导出，又因为 `module.exports` 和 `exports` 指向同一个内存地址，我们给 `exports` 赋值之后内存地址改变了，不再指向和 `module.exports` 相同的内存地址，因此 `module.exports` 的值还是 `{}`，导出的数据也是 `{}`

3. `module.exports` 可以使用 `.` 也能使用 `=`

   ```js
   // moduleA.js
   module.exports = 123
   console.log(exports) // {}
   
   // test.js
   const n = require('./moduleA.js')
   console.log(n) // 123
   ```

   ```js
   // moduleA.js
   module.exports.a = 123
   console.log(exports) // {a: 123}
   
   // test.js
   const { a } = require('./moduleA.js')
   console.log(a) // 123
   ```

   使用 `.` 相当于给对象添加属性，`module.exports` 和 `exports` 都会有这个属性，因此在第二个例子打印 `exports` 时的值也是 `{a: 123}` 

   使用 `=` 改变了`module.exports` 指向的内存地址，但是文件还是会导出 `module.exports` ，所以还是能拿到导出的数据，`exports` 的值不变还是 `{}` 


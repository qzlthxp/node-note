# cjs

nodejs的模块名为 commonjs 简称 cjs例如

```js
// moduleA.js
module.exports = {
  name: 'foo'
}

// index.js
const {name} = require('./modueA.js')
```

exports 和 module.exports 默认指向同一内存地址，值为 {}。exports只能使用 `.` 操作符，不能使用 `=` 赋值，module.exports 两个都能用。最终导出的还是 module.exports 指向的数据
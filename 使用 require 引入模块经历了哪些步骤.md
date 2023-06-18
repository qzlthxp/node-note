# 使用 require 引入模块经历了哪些步骤

## nodejs 有三种类型的模块

- nodejs 内置模块：fs 、http、events、url、path等
- 第三方模块：express
- 自己定义的模块：utils.js

## 根据参数搜索模块

- 当 require 函数接收到参数时，会首先尝试加载具有该名称的核心模块。

- 如果这个模块名称以 `./`或者 `../` 开头，那么意味着它是一个开发者模块，nodejs尝试根据给定路径加载这个模块，如果没有找到对应名称的文件，它会寻找一个对应名称的文件夹然后加载 `index.js` (如果存在 index.js 的话)

  例如 `require(./lib/controller)`，会优先搜索 lib 文件夹下的 controller.js 文件，如果没找到会去找 lib 文件夹下的 controller 文件夹，然后加载里面的 index.js 文件。 

- 如果既没有在nodejs 核心模块中找到对应模块，也不是用户自定义模块，那么node会假定它是来自 npm 的模块，然后从 node_modules 文件夹中寻找并加载对应文件。

- 任何地方都没有找到对应模块，抛出错误并执行该应用程序已停止。

## 成功加载模块

加载模块后，模块的代码被包装成一个特殊的函数让我们可以访问几个特殊对象

```js
(function(exports, require, module, __filename, __dirname){
  // Module code lives here...
})

/*
require: 用于引入模块
module: 对当前模块的引用
exports: 导出数据和 module.exports 的关系外面的文件有单独说明
__filename: 当前模块的完整路径
__dirname: 当前模块所处文件夹的完整路径
*/
```

## 执行模块代码

## 返回数据

解析加载，包装，执行完毕之后将模块内 module.exports 的值返回出去。

## 缓存

将第一次加载后的模块进行缓存。




















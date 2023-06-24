const path = require('path')

// console.log(path.join('')) // .
// console.log(path.join('.', 'a', '/c/d')) // /a/c/d/f

console.log(path.resolve('')) // 当前工作目录
console.log(path.resolve('a')) // 当前工作目录/a
console.log(path.resolve('/a')) // /a
console.log(path.resolve('/a', '/b')) // /b
console.log(path.resolve('/a', 'b')) // /a/b
console.log(path.resolve('/a', 'b/c', '../e')) // /a/b/e

// console.log(path.basename(__filename)) // path.js
// console.log(path.basename(__filename, '.js')) // path
// console.log(path.extname(__filename)) // .js
// console.log(path.basename(__dirname)) // 2-how-node-works
// console.log(path.extname(__dirname)) // 空字符串
// console.log(path.join(__dirname, 'path.js')) // /Users/cc/node-note/code/2-how-node-works/path.js
// console.log(path.join('/a', '/b/c', '../', './d', 'e')) // /a/b/d/e

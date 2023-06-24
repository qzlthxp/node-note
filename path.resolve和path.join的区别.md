# path.resolve和path.join的区别

## path.join

只是单纯的路径拼接

```js
console.log(path.join('')) // .
console.log(path.join('.', 'a', '/c/d')) // /a/c/d
console.log(path.join('.', 'a', '/c/d', '/')) // /a/c/d/
console.log(path.join('.', 'a', '/c/d', '/', '.', 'e/../f')) // /a/c/d/f
console.log(path.join('a')) // a
console.log(path.join('/a')) // /a
```

## path.resolve

会解析为绝对路径

```js
console.log(path.resolve('')) // 当前工作目录
console.log(path.resolve('a')) // 当前工作目录/a
console.log(path.resolve('/a')) // /a
console.log(path.resolve('/a', '/b')) // /b
console.log(path.resolve('/a', 'b')) // /a/b
console.log(path.resolve('/a', 'b/c', '../e')) // /a/b/e
```


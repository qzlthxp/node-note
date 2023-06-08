# 基础http服务

1. 引入 `http` 模块

   ```js
   const http = require('http')
   ```

2. 通过 `createServer` 创建一个服务

   ```js
   const server = http.createServer((req, res) => {
     // 返回一个基础字符串
     res.end('Hello from the server')
   })
   
   // 监听本地8000端口
   server.listen(8000, '127.0.0.1', () => {
     // 一个会立即执行的 callback
     console.log('Listening to requests on port 8000')
   })
   ```

3. 打开浏览器访问 `http://127.0.0.1:8000`，可以看到页面上显示 `Hello from the server`，并且终端也打印了 `Listening to requests on port 8000` 。

## 完整demo

```js
const http = require('http')

const server = http.createServer((req, res) => {
  res.end('Hello from the server')
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000')
})
```


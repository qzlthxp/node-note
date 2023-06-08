# 根据不同url做出不同的响应

1. 依然需要创建 `http` 服务，并且监听对应端口

   ```js
   const http = require('http')
   
   const server = http.createServer((req, res) => {
     res.end('OK')
   })
   
   server.listen(8000, '127.0.0.1', () => {
     console.log('server start')
   })
   ```

2. 获取 `url`，通过 `req` 的 `url` 参数获取当前请求对应的url。

   ```js
   const server = http.createServer((req, res) => {
     const pathName = req.url
     /* 
     	pathName的值可能是：
     	/,
     	/favicon.ico,
     	/overview,
     	/product?id=1,
    	*/
     res.end('OK')
   })
   ```

3. 通过判断来一一处理

   ```js
   const server = http.createServer((req, res) => {
     const pathName = req.url
     if (pathName === '/' || pathName === '/overview') {
       res.end('This is the OVERVIEW')
     } else if (pathName === 'product') {
       res.end('This is the PRODUCT')
     }
     res.end('OK')
   })
   ```

   我们就对 `/` `/overview` `/product` ，三个路由做了响应，但是当我们访问其他任意路由时，发现浏览器tab栏一直在转圈，因为没法去处理对应的请求。一般情况下，这些都会跳转到404页面。

4. 处理404页面

   ```js
   const server = http.createServer((req, res) => {
     const pathName = req.url
     if (pathName === '/' || pathName === '/overview') {
       res.end('This is the OVERVIEW')
     } else if (pathName === 'product') {
       res.end('This is the PRODUCT')
     } else {
       // 给404响应添加首部状态行状态码404，并且设置一些响应首部字段
       // 设置上述信息一定要在 end 方法之前设置，否则无效
       res.writeHead(404, {
         'my-own-header': 'my-header'
       })
       res.end('Page not found')
     }
     res.end('OK')
   })
   ```

5. 设置响应首部字段 `Content-Type: text/html`，让浏览器解析响应的html标签

   ```js
   const server = http.createServer((req, res) => {
     const pathName = req.url
     if (pathName === '/' || pathName === '/overview') {
       res.end('This is the OVERVIEW')
     } else if (pathName === 'product') {
       res.end('This is the PRODUCT')
     } else {
       // 给404响应添加首部状态行状态码404，并且设置一些响应首部字段
       // 设置上述信息一定要在 end 方法之前设置，否则无效
       res.writeHead(404, {
         'Content-Type': 'text/html'
       })
       res.end('<h1>Page not found</h1>')
     }
     res.end('OK')
   })
   ```

## 完整demo

```js
const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  const pathName = req.url

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the OVERVIEW')
  } else if (pathName === '/product') {
    res.end('This is the PRODUCT')
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html'
    })
    res.end('<h1>Page not found</h1>')
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('server start')
})
```


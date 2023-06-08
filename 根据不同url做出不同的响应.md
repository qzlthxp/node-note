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

## 常见 Content-Type 值

-   text/html ： HTML格式
-   text/plain ：纯文本格式   
-   text/xml ： XML格式
-   image/gif ：gif图片格式  
-   image/jpeg ：jpg图片格式 
-   image/png：png图片格式
-   application/xhtml+xml ：XHTML格式
-   application/xml   ： XML数据格式
-   application/atom+xml ：Atom XML聚合格式  
-   application/json  ： JSON数据格式
-   application/pdf    ：pdf格式 
-   application/msword ： Word文档格式
-   application/octet-stream ： 二进制流数据（如常见的文件下载）
-   application/x-www-form-urlencoded ： <form encType="">中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）

  **另外一种常见的媒体格式是上传文件之时使用的：**

-   multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式
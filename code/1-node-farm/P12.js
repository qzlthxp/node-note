const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  const pathName = req.url

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the OVERVIEW')
  } else if (pathName === '/product') {
    res.end('This is the PRODUCT')
  } else if (pathName === '/api') {
    // 读取 dev-data 文件夹中json文件内容作为响应数据
    fs.readFile(__dirname + '/dev-data/data.json', 'utf-8', (err, data) => {
      if (err) return err
      const productData = JSON.parse(data)
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(data)
    })
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    })
    res.end('<h1>page not found</h1>')
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('server start')
})

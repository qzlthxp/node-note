// 流
const fs = require('fs')
const server = require('http').createServer()

server.on('request', (req, res) => {
  /**
   * // 读取文件内容并返回
    fs.readFile('./test-file.txt', (err, data) => {
      res.end(data)
    })
    需要等待文件内容全部读取完毕 再一次性返回
    会很慢
   */
  /**
   * 
   * // 流式读取
  const readable = fs.createReadStream('./test-file.txt')
  // 每次读取到内容都发送出去
  readable.on('data', (chunk) => {
    // 流式读取文件比 write 快的多，造成背压，无法像接收数据那样快的发送数据
    res.write(chunk)
  })
  // 内容读取完毕结束
  readable.on('end', (chunk) => {
    res.end()
  })
  readable.on('error', (err) => {
    console.log(err)
    res.statusCode = 500
    res.end('File not found')
  })
   */
  // 处理背压
  const readable = fs.createReadStream('./test-file123.txt')
  // 一个可读流调用pipe方法参数为一个可写流 使用管道，放入可写流 res
  // 数据就可以通过管道传输到可写的目的地
  readable.pipe(res)
  readable.on('error', (err) => {
    console.log(err)
    res.statusCode = 500
    res.end('File not found')
  })
})

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for requests...')
})

console.log(__filename, __dirname)

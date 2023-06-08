const http = require('http')
const fs = require('fs')

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
  output = output.replace(/{%IMAGE%}/g, product.image)
  output = output.replace(/{%PRICE%}/g, product.price)
  output = output.replace(/{%FROM%}/g, product.from)
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
  output = output.replace(/{%QUANTITY%}/g, product.quantity)
  output = output.replace(/{%DESCRIPTION%}/g, product.description)
  output = output.replace(/{%ID%}/g, product.id)

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
  return output
}

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
)
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
)
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
)
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
  const pathName = req.url

  if (pathName === '/' || pathName === '/overview') {
    // Overview page
    res.writeHead(200, {
      'Content-type': 'text/html'
    })

    const cardHtml = dataObj.map((el) => replaceTemplate(tempCard, el))
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml)
    res.end(output)
  } else if (pathName === '/api') {
    // api page
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(data)
  } else if (pathName.startsWith('/product')) {
    // Product page
    res.end('This is the PRODUCT')
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'my-header'
    })
    res.end('<h1>page not found</h1>')
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log('server start')
})

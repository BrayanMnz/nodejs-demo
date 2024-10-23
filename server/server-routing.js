const http = require('http')
const port = process.env.PORT || 3000

const server = http.createServer((req,res) => {
  // normalizando la url url, eliminando los querystrings,
  // trailing slash, y llevando todo a minúscula 
  //
  const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
  switch(path) {
    case '':
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('Página de inicio')
      break
    case '/about':
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('About')
      break
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('Not Found')
      break
  } })

  server.listen(port, () => console.log(`Servidor en ejecución en el puerto: ${port}; `))

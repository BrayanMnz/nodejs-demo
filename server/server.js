const http = require('http');

const server = http.createServer();
const quote = require('../util/quotes')


server.on('request', function(req, res) {

  res.writeHead(200, 
    { "Content-Type": "text/html", 
      "otro-encabezado": "Valor aleatorio" });

  res.write("<h1> Ejemplo - HTML desde el servidor </h1>");
  res.end(`<p> ${quote} </p>`);
});

server.on('listening', () => {
  console.log('Servidor en ejecución...');
});

server.listen(3000);

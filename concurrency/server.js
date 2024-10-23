const http = require('http');
const port = process.env.PORT || 3000
const fs = require('fs');
const fs_2 = require('fs/promises')

const server = http.createServer((req, res) => { //callback 1
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
    switch (path) {
        case '':
            rootHandler(req, res)
            break
        case '/read-file':
            readFileHandler(req, res)
            break
        case '/read-file-2':
            readFileHandlerWithPromises(req, res)
            break
        case '/read-file-3':
            readFileHandlerWithPromisesAsyncAwait(req, res)
            break
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end('Not Found')
            break
    }
})


function rootHandler(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Pagina de inicio')
}

function readFileHandler(req, res) {
    fs.readFile("./concurrency/data/data.json", (err, data) => { //callback 2
        if (err == null) {
            res.writeHead(200, { 'Content-Type': 'text/plain', 'promises-or-callback': 'callback' })
            res.end(data, () => console.log("Archivo leido usando callbacks")); //callback 3
        } else {
            console.log(`Error: ${err.message}`);
            res.statusCode = 500;
            res.end();
        }
    });
}


async function readFileHandlerWithPromisesAsyncAwait(req, res) {
    try {
        const file = await fs_2.readFile("./concurrency/data/data.json"); //Aquí se crea la promesa
        res.writeHead(200, { 'Content-Type': 'application/json', 'promises-or-callback': 'promises with async await' });
        res.end(file, () => console.log("Archivo leido usando promises con async/await"));
    } catch (err) {
        console.log(`Error: ${err.message}`);
        res.statusCode = 500;
        res.end();  
    }
}

server.listen(port, () => {
    console.log('Servidor en ejecución...');
    console.log(`http:localhost:${port}`)
});

const http = require('http');
//read env variables
console.log(process.env.SERVER_URL);
console.log(process.env.PORT);
const server = http.createServer((req, res) => {
    const options = {
        hostname: process.env.SERVER, // the server to proxy to
        port: process.env.PORT, // the port to proxy to
        path: req.url, // the specific URL to proxy to
        method: req.method, // the HTTP method of the original request
        headers: req.headers // forward the headers of the original request
    };

    const proxy = http.request(options, function (targetRes) {
        res.writeHead(targetRes.statusCode, targetRes.headers);
        targetRes.pipe(res, {
            end: true
        });
    });
  
    req.pipe(proxy, {
        end: true
    });
   


});

server.listen(8000, () => {
    console.log('Proxy server running on http://localhost:8000');
});
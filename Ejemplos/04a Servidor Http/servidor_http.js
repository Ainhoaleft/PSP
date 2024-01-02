const http = require("http")

const requestListener = function (request, response){ 
    console.log("Se ha producido una petición") 
};

const server = http.createServer(requestListener);

server.listen(80);
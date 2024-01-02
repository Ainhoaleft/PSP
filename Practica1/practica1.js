const http = require("http");
const fs = require("fs");
const path = require("path");
const obtenerContentType = require("./mi_modulo");
var url = require('url');

const requestListener = function (request, response){

    var url_parts = url.parse(request.url, true);
    console.log(url_parts);

    let file ='./';

    if(url_parts.query.lang != undefined){
        file += url_parts.query.lang;
    }

    console.log(url_parts.pathname);

    if(url_parts.pathname=='/'){
        file += 'Index.html'
    }else {
        file += url_parts.pathname.substring(1);
    }
    console.log(file);

    if(file == "./styles.css"){
        response.setHeader("Location", "./style.css");
        response.writeHead(301);
        response.end();
        return;
    }

    console.log("Leer" + file);
    fs.readFile(file, (err, data) => {
    if(err){
        console.error(err);
        response.writeHead(404);
        response.end;
        return;
    }
    let ext = path.extname(file);
    console.log(ext);
    let ct = obtenerContentType(ext);
    console.log(ct);

    response.setHeader("Content-Type", 'text/html');
    response.writeHead(200);
    response.write(data);
    response.end();
    
    });

};  

const server = http.createServer(requestListener);
server.listen(80);


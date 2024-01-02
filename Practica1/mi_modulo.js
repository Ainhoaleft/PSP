const path = require('path');

function obtenerContentType(nombreArchivo) {

    const extension = path.extname(nombreArchivo);

    const tiposMime = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
    
    };

    return tiposMime[extension] || 'application/octet-stream';
}

module.exports = obtenerContentType;
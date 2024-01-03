const path = require('path');

function obtenerContentType(ext) {

    const extension = path.extname(ext);

    const tiposMime = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
    
    };

    return tiposMime[ext] || 'application/octet-stream';
}

module.exports = obtenerContentType;
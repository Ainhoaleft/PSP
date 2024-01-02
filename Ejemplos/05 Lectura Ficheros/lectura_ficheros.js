const fs = require("fs") 

fs.readFile('./prueba.txt', (err, data) => { 
    if (err) { 
        console.error(err); 
        return; 
    } 
    console.log(data); 
});


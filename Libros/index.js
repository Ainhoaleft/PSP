const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/biblioteca', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}); 

let app = express();
app.use(bodyParser.json()); 

let libroSchema = new mongoose.Schema({     
    titulo: String,     
    autor: [String],     
    ejemplares: Number 
});  

let Libro = mongoose.model('libros', libroSchema); 

app.get('/libros', (req, res) => {     
    Libro.find().then(result => {         
        res.send(result);     
    })
});

app.post('/libros', async (req, res) => {
    try {
      const librosData = Array.isArray(req.body) ? req.body : [req.body];
      const libros = await Libro.insertMany(librosData);
      res.status(201).json(libros);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


// C. Obtener todos los documentos que cumplan dos condiciones
app.get('/libros/busqueda', (req, res) => {
    let query = {};
    if (req.query.autor) {
        query.autor = req.query.autor;
    }
    if (req.query.minEjemplares) {
        query.ejemplares = { $gte: Number(req.query.minEjemplares) };
    }

    Libro.find(query)
        .then(libros => {
            res.status(200).json(libros);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
    });
});
// B. Obtener un documento por su ID
app.get('/libros/:id', (req, res) => {     
    Libro.findById(req.params.id)
        .then(libro => {
            if (!libro) {
                return res.status(404).json({ message: 'Libro no encontrado' });
            }
            res.status(200).json(libro);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});
  
    // E. Actualizar un documento dada una condición
    app.put('/libros', (req, res) => {
        const { titulo, ejemplares } = req.body;
        Libro.findOneAndUpdate({ titulo: titulo }, { $set: { ejemplares: ejemplares } }, { new: true })
            .then(libro => {
                if (!libro) {
                    return res.status(404).json({ message: 'Libro no encontrado' });
                }
                res.status(200).json(libro);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            });
    });
    
    
    // F. Eliminar un documento dado su id
    app.delete('/libros/:id', (req, res) => {
        Libro.findOneAndDelete({ _id: req.params.id })
            .then(result => {
                if (!result) {
                    return res.status(404).json({ message: 'Libro no encontrado' });
                }
                res.status(200).json({ message: 'Libro eliminado correctamente' });
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            });
    });
    

app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080");
});

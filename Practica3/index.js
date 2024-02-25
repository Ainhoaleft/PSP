const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/FormulaUno', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}); 

let app = express();
app.use(bodyParser.json()); 

let pilotoSchema = new mongoose.Schema({     
    escuderia: String,     
    nombre: [String],     
    anyos: Number 
}); 

let Piloto = mongoose.model('pilotos', pilotoSchema); 

//A. Obtener todos los documentos de la colección.
app.get('/pilotos', (req, res) => {     
    Piloto.find().then(result => {         
        res.send(result);     
    })
});

// B. Obtener un documento por su ID
app.get('/pilotos/:id', (req, res) => {     
    Piloto.findById(req.params.id)
        .then(Piloto => {
            if (!Piloto) {
                return res.status(404).json({ message: 'Piloto no encontrado' });
            }
            res.status(200).json(Piloto);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

// C. Obtener todos los documentos que cumplan dos condiciones
app.get('/pilotos/busqueda', (req, res) => {
    let query = {};
    if (req.query.nombre) {
        query.nombre = req.query.nombre;
    }
    if (req.query.minAnyos) {
        query.anyos = { $gte: Number(req.query.minAnyos) };
    }

    Piloto.find(query)
        .then(Pilotos => {
            res.status(200).json(Pilotos);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
    });
});

//D. Insertar uno o varios documentos.
app.post('/pilotos', async (req, res) => {
    try {
      const pilotosData = Array.isArray(req.body) ? req.body : [req.body];
      const pilotos = await Piloto.insertMany(pilotosData);
      res.status(201).json(pilotos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

    // E. Actualizar un documento dada una condición
    app.put('/pilotos', (req, res) => {
        const { escuderia, anyos } = req.body;
        Piloto.findOneAndUpdate({ escuderia: escuderia }, { $set: { anyos: anyos } }, { new: true })
            .then(Piloto => {
                if (!Piloto) {
                    return res.status(404).json({ message: 'Piloto no encontrado' });
                }
                res.status(200).json(Piloto);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            });
    });
     
    // F. Eliminar un documento dado su id
    app.delete('/pilotos/:id', (req, res) => {
        Piloto.findOneAndDelete({ _id: req.params.id })
            .then(result => {
                if (!result) {
                    return res.status(404).json({ message: 'Piloto no encontrado' });
                }
                res.status(200).json({ message: 'Piloto eliminado correctamente' });
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            });
    });
    
app.listen(8080, () => {
    console.log("Se escucha en el puerto 8080");
});

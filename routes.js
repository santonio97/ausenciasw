const express = require('express');
const { Docentes, Ausencias } = require('./models');

const router = express.Router();

// ver todos los profesores
router.get('/docentes', (req, res) => {
    Docentes.find({}, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

// ver todos las ausencias
router.get('/ausencias', (req, res) => {
    Ausencias.find({}, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

// ver un profesor
router.get('/docentes/:nombre', (req, res) => {
    Docentes.findOne({_id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

// ver una ausencia
router.get('/ausencias/:fecha/:hora', (req, res) => {
    Ausencias.findOne({_id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

/* Comentado porque no se va a usar

// eliminar un concesionario
router.delete('/concesionario/:id', (req, res) => {
    Concesionario.findOneAndRemove({_id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

// eliminar un coche
router.delete('/coches/:id', (req, res) => {
    Coches.findOneAndRemove({_id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

// actualizar un concesionario
router.put('/concesionario/:id', (req, res) => {
    Concesionario.findOneAndUpdate({_id: req.params.id },
        { $set: { cochesRegistrados: req.body.cochesRegistrados,
                  ubicacion: req.body.ubicacion,
                  nombre: req.body.nombre
                } 
            },
        (err, data) => {
            if (err) res.json({ error: err });
            else res.json(data);
        });
});

// actualizar un coche
router.put('/coches/:id', (req, res) => {
    Coches.findOneAndUpdate({_id: req.params.id },
        { $set: { marca: req.body.marca,
                  modelo: req.body.modelo,
                  precio: req.body.precio
                } 
            },
        (err, data) => {
            if (err) res.json({ error: err });
            else res.json(data);
        });
});

// insertar un concesionario
router.post('/concesionario', (req, res) => {
    const concesionario = new Concesionario({
        cochesRegistrados: req.body.cochesRegistrados,
        ubicacion: req.body.ubicacion,
        nombre: req.body.nombre
    });
    concesionario.save((err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

// insertar un coche
router.post('/coches', (req, res) => {
    const coches = new Coches({
        marca: req.body.marca,
        modelo: req.body.modelo,
        precio: req.body.precio
    });
    coches.save((err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

*/

module.exports = router;
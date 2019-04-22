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
    Docentes.findOne({ nombre: req.params.nombre }, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

// ver una ausencia
router.get('/ausencias/:fecha/:hora', (req, res) => {
    Ausencias.findOne({ hora: req.params.hora }, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

// ---------------------------------------------------------------
// Comentado porque no se va a usar (COMENTAR DESPUES ESTE BLOQUE)
// ---------------------------------------------------------------

/*

// eliminar un profesor
router.delete('/docentes/:nombre', (req, res) => {
    Docentes.findOneAndRemove({ nombre: req.params.nombre }, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

// eliminar una ausencia
router.delete('/ausencias/:fecha/:hora', (req, res) => {
    Ausencias.findOneAndRemove({ hora: req.params.hora }, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

// actualizar un profesor
router.put('/docentes/:nombre', (req, res) => {
    Docentes.findOneAndUpdate({ nombre: req.params.nombre },
        { $set: { nombre: req.body.nombre
                } 
            },
        (err, data) => {
            if (err) res.json({ error: err });
            else res.json(data);
        });
});

// actualizar un ausencia
router.put('/ausencias/:fecha/:hora', (req, res) => {
    Ausencias.findOneAndUpdate({ hora: req.params.hora },
        { $set: { fecha: req.body.fecha,
                  hora: req.body.hora,
                  nombre: req.body.nombre,
                  curso: req.body.curso
                } 
            },
        (err, data) => {
            if (err) res.json({ error: err });
            else res.json(data);
        });
});

// insertar un profesor
router.post('/docentes', (req, res) => {
    const concesionario = new Docentes({
        nombre: req.body.nombre
    });
    concesionario.save((err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

// insertar un ausencia
router.post('/ausencias', (req, res) => {
    const coches = new Ausencias({
        fecha: req.body.fecha,
        hora: req.body.hora,
        nombre: req.body.nombre,
        curso: req.body.curso
    });
    coches.save((err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

*/

module.exports = router;
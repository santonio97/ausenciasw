const express = require('express');
const { Docente, Ausencias } = require('./models');

const router = express.Router();

// ver todos los profesores
router.get('/docentes', (req, res) => {
    Docente.find({}, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

// ver todas las ausencias
router.get('/ausencias', (req, res) => {
    Ausencias.find({}, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

// ver un profesor
/*router.get('/docentes/:id', (req, res) => {
    Docente.findOne({ _id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});*/

router.get('/docentes/:profesor', (req, res) => {
    Docente.findOne({ profesor: req.params.profesor }, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

// ver una ausencia
router.get('/ausencias/:id', (req, res) => {
    Ausencias.findOne({ _id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

/*
router.get('/ausencias/:fecha', (req, res) => {
    Ausencias.find({ fecha: req.params.fecha }, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});
*/

// ---------------------------------------------------------------
// Comentado porque no se va a usar (COMENTAR DESPUES ESTE BLOQUE)
// ---------------------------------------------------------------



// eliminar un profesor
router.delete('/docentes/:id', (req, res) => {
    Docente.findOneAndRemove({ _id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

/*
router.delete('/docentes/:profesor', (req, res) => {
    Docente.findOneAndRemove({ profesor: req.params.profesor }, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});
*/

// eliminar una ausencia
router.delete('/ausencias/:id', (req, res) => {
    Ausencias.findOneAndRemove({ _id: req.params.id }, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

/*
router.delete('/ausencias/:fecha', (req, res) => {
    Ausencias.findOneAndRemove({ fecha: req.params.fecha }, (err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});
*/

// actualizar un profesor
router.put('/docentes/:id', (req, res) => {
    Docente.findOneAndUpdate({ _id: req.params.id },
        {
            $set: {
                profesor: req.body.profesor,
                alias: req.body.alias,
                email: req.body.email,
                departamento: req.body.departamento
            }
        },
        (err, data) => {
            if (err) res.json({ error: err });
            else res.json(data);
        });
});

/*
router.put('/docentes/:profesor', (req, res) => {
    Docente.findOneAndUpdate({ profesor: req.params.profesor },
        { $set: { 
                profesor: req.body.profesor,
                alias: req.body.alias,
                email: req.body.email,
                departamento: req.body.departamento
            } 
        },
        (err, data) => {
            if (err) res.json({ error: err });
            else res.json(data);
        });
});
*/

// actualizar una ausencia
router.put('/ausencias/:id', (req, res) => {
    Ausencias.findOneAndUpdate({ _id: req.params.id },
        {
            $set: {
                fecha: req.body.fecha,
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

/*
router.put('/ausencias/:fecha/', (req, res) => {
    Ausencias.findOneAndUpdate({ fecha: req.params.fecha },
        { $set: { fecha: req.body.fecha//,
                  //hora: req.body.hora,
                  //nombre: req.body.nombre,
                  //curso: req.body.curso
                } 
            },
        (err, data) => {
            if (err) res.json({ error: err });
            else res.json(data);
        });
});
*/

// insertar un profesor
router.post('/docentes', (req, res) => {
    const docente = new Docente({
        profesor: req.body.profesor,
        alias: req.body.alias,
        email: req.body.email,
        departamento: req.body.departamento
    });
    docente.save((err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});

// insertar una ausencia
router.post('/ausencias', (req, res) => {
    const ausencias = new Ausencias({
        fecha: req.body.fecha,
        hora: req.body.hora,
        nombre: req.body.nombre,
        curso: req.body.curso
    });
    ausencias.save((err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
});



module.exports = router;
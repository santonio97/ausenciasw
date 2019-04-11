const mongoose = require('mongoose');

const Docentes = mongoose.model('/api/docentes', {
    nombre: String
});

const Ausencias = mongoose.model('/api/ausencias', {
    fecha: String,
    hora: Number,
    nombre: String,
    curso: String
});

module.exports = {
    Docentes,
    Ausencias
};
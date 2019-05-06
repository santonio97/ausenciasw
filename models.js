const mongoose = require('mongoose');

const Docente = mongoose.model('docentes', {
    profesor: String
});

const Ausencias = mongoose.model('ausencias', {
    fecha: Date,
    hora: String,
    nombre: String,
    curso: String
});

module.exports = {
    Docente,
    Ausencias
};
const mongoose = require('mongoose');

const Docente = mongoose.model('docente', {
    nombre: String
});

const Ausencias = mongoose.model('ausencias', {
    fecha: Date/*,
    hora: Number,
    nombre: String,
    curso: String*/
});

module.exports = {
    Docente,
    Ausencias
};
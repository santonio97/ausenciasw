const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const config   = require('./config');
const routes = require('./routes');

//importaciones de los modulos
const app = express(); 
//conexion a bbdd
mongoose.connect(config.db_uri, { useNewUrlParser: true })
    .then(db => console.log('Conexión correcta a la BD'))
    .catch(err => console.log('Error en la conexión a la BD'));

// --- MIDDLEWARE
// Para redirigir trafico HTTP a HTTPS
/*
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && process.env.PORT )
    res.redirect(`https://${req.header('host')}${req.url}`);
  else
    next();
});
*/

app.use(express.static(path.join(__dirname, 'public')));
// Rutas
app.use(express.json());
app.use('/api', routes);

// --- PUERTO DE ESCUCHA
app.listen(config.port, () => console.log('Servidor iniciado en puerto ' + config.port));
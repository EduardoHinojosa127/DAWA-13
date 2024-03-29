const mongoose = require('mongoose');

const videojuegoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  valoracion: { type: Number, required: true },
  genero: { type: String, required: true }
  // Otros campos que desees para tu modelo
});

module.exports = mongoose.model('Videojuego', videojuegoSchema);

const Videojuego = require('../models/videojuego');

// Obtener todos los videojuegos
exports.getVideojuegos = (req, res) => {
  Videojuego.find()
    .then((videojuegos) => {
      res.json(videojuegos);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Obtener un videojuego por su ID
exports.getVideojuegoById = (req, res) => {
  Videojuego.findById(req.params.id)
    .then((videojuego) => {
      if (!videojuego) {
        return res.status(404).json({ message: 'Videojuego no encontrado' });
      }
      res.json(videojuego);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Crear un nuevo videojuego
exports.createVideojuego = (req, res) => {
  const newVideojuego = new Videojuego({
    name: req.body.name,
    description: req.body.description,
    valoracion: req.body.valoracion,
    genero: req.body.genero,
  });
  newVideojuego.save()
    .then((videojuego) => {
      res.status(201).json(videojuego);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Actualizar un videojuego existente
exports.updateVideojuego = (req, res) => {
  Videojuego.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((videojuego) => {
      if (!videojuego) {
        return res.status(404).json({ message: 'Videojuego no encontrado' });
      }
      res.json(videojuego);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Eliminar un videojuego existente
exports.deleteVideojuego = (req, res) => {
  Videojuego.findByIdAndDelete(req.params.id)
    .then((videojuego) => {
      if (!videojuego) {
        return res.status(404).json({ message: 'Videojuego no encontrado' });
      }
      res.json({ message: 'Videojuego eliminado correctamente' });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

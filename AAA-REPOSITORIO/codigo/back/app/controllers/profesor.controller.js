const db = require("../models");
const Profesor = db.profesor;


exports.create = (req, res) => {
  
  

 
  const profesor = new Profesor({
    usuariouva: req.body.usuariouva,
    password: req.body.password,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    despacho: req.body.despacho,
    email: req.body.email,
    fotoRuta:"https://res.cloudinary.com/dg8yqncy0/image/upload/v1682111754/usuarioGenerico_w4atwg.jpg"
    
  });

  
  profesor
    .save(profesor)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Profesor."
      });
    });
};

exports.identificar = (req, res) => {
  const usuariouva=(req.query.usuariouva)
  const password=(req.query.password)
  console.log("identificar")
  
  Profesor.find({
    usuariouva:usuariouva,
    password:password
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Profesor."
      });
    });

  };


exports.findAll = (req, res) => {
  

  Profesor.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Profesor."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;

  Profesor.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Profesor with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Profesor with id=" + id });
    });
};


exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Profesor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Profesor with id=${id}. Maybe Profesor was not found!`
        });
      } else res.send({ message: "Profesor was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Profesor with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Profesor.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Profesor with id=${id}. Maybe Profesor was not found!`
        });
      } else {
        res.send({
          message: "Profesor was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Profesor with id=" + id
      });
    });
};






const db = require("../models");
const Alumno = db.alumno;


exports.create = (req, res) => {
  
  

 
  const alumno = new Alumno({
    usuariouva: req.body.usuariouva,
    password: req.body.password,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    grado: req.body.grado,
    email: req.body.email,
    fotoRuta:"https://res.cloudinary.com/dg8yqncy0/image/upload/v1682111754/usuarioGenerico_w4atwg.jpg"
    
  });

  
alumno
    .save(alumno)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Alumno."
      });
    });
};


exports.findAll = (req, res) => {
  

  Alumno.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Alumnos."
      });
    });
};



exports.identificar = (req, res) => {
const usuariouva=(req.query.usuariouva)
const password=(req.query.password)

Alumno.find({
  usuariouva:usuariouva,
  password:password
})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Alumnos."
    });
  });


  /*
  const usuariouva=req.body.usuariouva;
  const password=req.body.password;


  */
};


exports.findOne = (req, res) => {
  const id = req.params.id;

  Alumno.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Alumno with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Alumno with id=" + id });
    });
};


exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Alumno.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Alumno with id=${id}. Maybe Alumno was not found!`
        });
      } else res.send({ message: "Alumno was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Alumno with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Alumno.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Alumno with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Alumno was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Alumno with id=" + id
      });
    });
};






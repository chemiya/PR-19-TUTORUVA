const db = require("../models");
const ProfesorGuardado = db.profesorguardado;


exports.create = (req, res) => {
  
  

 
  const profesorguardado = new ProfesorGuardado({
    idalumno: req.body.idalumno,
    idprofesor: req.body.idprofesor,
    despacho:req.body.despacho,
    nombre:req.body.nombre,
    apellidos:req.body.apellidos,
    email:req.body.email,
    fotoRuta:req.body.fotoRuta
   

    
    
  });

  
  profesorguardado
    .save(profesorguardado)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ProfesorGuardado."
      });
    });
};

exports.comprobar = (req, res) => {
  const idAlumno=(req.query.idAlumno)
  const idProfesor=(req.query.idProfesor)
  console.log("comprobando si el alumno guarda al profesor")
  console.log(idAlumno)
  console.log(idProfesor)
  
  ProfesorGuardado.find({
    idprofesor:idProfesor,
    idalumno:idAlumno
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






/*
exports.findAll = (req, res) => {
  

  Tutoria.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tutoria."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutoria.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutoria with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutoria with id=" + id });
    });
};*/

exports.findDeAlumno = (req, res) => {
  const id = req.params.id;

  ProfesorGuardado.find(
    {idalumno:id}
  )
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found ProfesorGuardado with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving ProfesorGuardado with id=" + id });
    });
};


/*
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Tutoria.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutoria with id=${id}. Maybe Tutoria was not found!`
        });
      } else res.send({ message: "Tutoria was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutoria with id=" + id
      });
    });
};*/


exports.delete = (req, res) => {
  const id = req.params.id;

  ProfesorGuardado.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete ProfesorGuardado with id=${id}. Maybe ProfesorGuardado was not found!`
        });
      } else {
        res.send({
          message: "ProfesorGuardado was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete ProfesorGuardado with id=" + id
      });
    });
};






const db = require("../models");
const Tutoria = db.tutoria;


exports.create = (req, res) => {
  
 

 
  const tutoria = new Tutoria({
    fecha: req.body.fecha,
    horainicio: req.body.horainicio,
    horafin: req.body.horafin,
    descripcion: req.body.descripcion,
    estadotutoria: req.body.estadotutoria,
    idalumnoparticipante: req.body.idalumnoparticipante,
    idprofesorparticipante: req.body.idprofesorparticipante,
    idcreador: req.body.idcreador,
    nombrecompletoprofesor: req.body.nombrecompletoprofesor,
    nombrecompletoalumno: req.body.nombrecompletoalumno,


    
    
  });

  
  tutoria
    .save(tutoria)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutoria."
      });
    });
};


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
};

exports.findDeUsuarioProfesor = (req, res) => {
  const id = req.params.id;

  Tutoria.find(
    {idprofesorparticipante:id}
  )
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
};

exports.findDeUsuarioAlumno = (req, res) => {
  const id = req.params.id;

  Tutoria.find(
    {idalumnoparticipante:id}
  )
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
};


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
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Tutoria.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutoria with id=${id}. Maybe Tutoria was not found!`
        });
      } else {
        res.send({
          message: "Tutoria was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutoria with id=" + id
      });
    });
};






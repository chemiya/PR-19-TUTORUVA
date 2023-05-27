const db = require("../models");
const AlumnoGuardado = db.alumnoguardado;


exports.create = (req, res) => {
  
  

 
  const alumnoguardado = new AlumnoGuardado({
    idalumno: req.body.idalumno,
    idprofesor: req.body.idprofesor,
    grado:req.body.grado,
    nombre:req.body.nombre,
    apellidos:req.body.apellidos,
    email:req.body.email,
    fotoRuta:req.body.fotoRuta
    
    
   

    
    
  });

  

  alumnoguardado
    .save(alumnoguardado)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the AlumnoGuardado."
      });
    });
};


/*
exports.comprobar = (req, res) => {
  const idAlumno=(req.query.idalumno)
  const idProfesor=(req.query.idprofesor)
  console.log("compruebo si el profesor guarda al alumno")
  console.log(idAlumno)
  console.log(idProfesor)
  
  AlumnoGuardado.find({
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

  };*/

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

exports.findDeProfesor = (req, res) => {
  const id = req.params.id;

  AlumnoGuardado.find(
    {idprofesor:id}
  )
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found AlumnoGuardado with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving AlumnoGuardado with id=" + id });
    });
};


exports.comprobar = (req, res) => {
  
  const idAlumno=(req.query.idAlumno)
  const idProfesor=(req.query.idProfesor)
  console.log("compruebo si el profesor guarda al alumno")
  console.log(idAlumno)
  console.log(idProfesor)
  
  AlumnoGuardado.find({
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
  console.log("eliminando")
  console.log(id)

  AlumnoGuardado.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete AlumnoGuardado with id=${id}. Maybe AlumnoGuardado was not found!`
        });
      } else {
        res.send({
          message: "AlumnoGuardado was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete AlumnoGuardado with id=" + id
      });
    });
};






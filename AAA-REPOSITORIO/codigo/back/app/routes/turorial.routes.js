module.exports = app => {
  const alumno = require("../controllers/alumno.controller.js");
  const tutoria = require("../controllers/tutoria.controller.js");
  const profesor = require("../controllers/profesor.controller.js");
  const profesorguardado = require("../controllers/profesorguardado.controller.js");
  const alumnoguardado = require("../controllers/alumnoguardado.controller.js");

  var router = require("express").Router();

 
  router.post("/alumno", alumno.create);

 
  router.get("/alumno", alumno.findAll);
  router.get("/alumno/identificar", alumno.identificar);
  router.get("/profesor/identificar", profesor.identificar);

  
  router.get("/alumno/:id", alumno.findOne);

 
  router.put("/alumno/:id", alumno.update);

 
  router.post("/profesor", profesor.create);

 
  router.get("/profesor", profesor.findAll);

  
  router.get("/profesor/:id", profesor.findOne);

 
  router.put("/profesor/:id", profesor.update);


  router.post("/tutoria", tutoria.create);

 
  router.get("/tutoria", tutoria.findAll);

  
  router.get("/tutoria/:id", tutoria.findOne);
  router.get("/tutoria/usuarioprofesor/:id", tutoria.findDeUsuarioProfesor);
  router.get("/tutoria/usuarioalumno/:id", tutoria.findDeUsuarioAlumno);

 
  router.put("/tutoria/:id", tutoria.update);

 

  router.get("/alumnoguardado/:id", alumnoguardado.findDeProfesor);
  router.get("/profesorguardado/:id", profesorguardado.findDeAlumno);
  router.post("/profesorguardado", profesorguardado.create);
  router.post("/alumnoguardado", alumnoguardado.create);


  router.get("/alumnoguardado", alumnoguardado.comprobar);
  router.get("/profesorguardado", profesorguardado.comprobar);
 

 

  router.delete("/profesorguardado/:id", profesorguardado.delete);
  router.delete("/alumnoguardado/:id",alumnoguardado.delete);


  /*
  router.get("/alumnoguardado/:id", profesorguardado.findDeProfesor);
  router.get("/profesorguardado/:id", alumnoguardado.findDeAlumno);*/



 
  

  app.use("/api", router);
};

import http from "../http-common";

class TutoruvaService {


  identificarAlumno(usuariouva,password) {
    return http.get("/alumno/identificar?usuariouva="+usuariouva+"&password="+password);
   

  }

  identificarProfesor(usuariouva,password) {
    return http.get("/profesor/identificar?usuariouva="+usuariouva+"&password="+password);
   

  }

  comprobarProfesorGuardado(idAlumno,idProfesor) {
    
    return http.get("/profesorguardado?idAlumno="+idAlumno+"&idProfesor="+idProfesor);
   

  }

  comprobarAlumnoGuardado(idProfesor,idAlumno) {
    return http.get("/alumnoguardado?idProfesor="+idProfesor+"&idAlumno="+idAlumno);
   

  }

  registrarProfesor(data) {
    return http.post("/profesor", data);
  }

  registrarAlumno(data) {
    return http.post("/alumno", data);
  }

  buscarAlumno(id) {
    return http.get(`/alumno/${id}`);
  }
  buscarTutoria(id) {
    return http.get(`/tutoria/${id}`);
  }

  buscarProfesor(id) {
    return http.get(`/profesor/${id}`);
  }

  buscarTodosAlumnos() {
    return http.get(`/alumno`);
  }

  buscarTutoriasProfesor(id) {
    return http.get(`/tutoria/usuarioprofesor/${id}`);
  }

  buscarTutoriasAlumno(id) {
    return http.get(`/tutoria/usuarioalumno/${id}`);
  }

  buscarTodosProfesores() {
    return http.get(`/profesor`);
  }

  buscarAlumnosGuardados(id) {
    return http.get(`/alumnoguardado/`+id);
  }

  buscarProfesoresGuardados(id) {
    return http.get(`/profesorguardado/`+id);
  }

  crearTutoria(data) {
    return http.post("/tutoria", data);
  }
  guardarAlumno(data) {
    return http.post("/alumnoguardado", data);
  }

  guardarProfesor(data) {
    return http.post("/profesorguardado", data);
  }

  editarAlumno(id, data) {
    return http.put(`/alumno/${id}`, data);
  }

  editarTutoria(id, data) {
    return http.put(`/tutoria/${id}`, data);
  }

  editarProfesor(id, data) {
    return http.put(`/profesor/${id}`, data);
  }

  eliminarGuardarAlumno(id) {
    return http.delete(`/alumnoguardado/${id}`);
  }

  eliminarGuardarProfesor(id) {
    return http.delete(`/profesorguardado/${id}`);
  }

  /*
  getAll() {
    return http.get("/tutorials");
   

  }

  get(id) {
    return http.get(`/tutorials/${id}`);
  }

  create(data) {
    return http.post("/tutorials", data);
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }*/
}

export default new TutoruvaService();
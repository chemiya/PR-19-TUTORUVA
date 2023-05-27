import React, { Component } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import TutoruvaService from "../services/tutoruva.service";
import Cookies from 'universal-cookie';
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import ScaleLoader from "react-spinners/ScaleLoader";


export default function CrearTutoria() {
  const schema = Yup.object().shape({
    fecha: Yup.string().required("La fecha es obligatoria."),
    horainicio: Yup.string().required("La hora de inicio es obligatoria."),
    horafin: Yup.string().required("La hora de fin es obligatoria."),
    descripcion: Yup.string().required("La descripción es obligatoria."),
    alumnoparticipante: Yup.string().required("El alumno participante es obligatorio."),
    profesorparticipante: Yup.string().required("El profesor participante es obligatorio.")

  })
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    obtenerValores();

    comprobarEdicion()



  }, []);



  //si editar o crear
  const comprobarEdicion = () => {
    if (id == "nueva") {
      setAccion("Crear")
    } else {
      TutoruvaService.buscarTutoria(id)
        .then(response => {
          setTutoriaEditar(response.data)
          setAccion("Editar")
          setValue("descripcion", response.data.descripcion)
          setValue("fecha", response.data.fecha)
          setValue("horainicio", response.data.horainicio)
          setValue("horafin", response.data.horafin)
          setValue("profesorparticipante", response.data.nombrecompletoprofesor)
          setValue("alumnoparticipante", response.data.nombrecompletoalumno)


        })
        .catch(e => {
          console.log(e);
        });
    }
  }


  //cookies
  const obtenerValores = async () => {
    const cookies = new Cookies();

    setAllValues({ ["nombreCompleto"]: cookies.get("nombreCompleto"), ["id"]: cookies.get("id") })

    setTipoUsuario(cookies.get("tipo"))

    if (cookies.get("tipo") == "Profesor") {
      buscarTodosAlumnos()
    } else {
      buscarTodosProfesores()
    }



  }

  const [allValues, setAllValues] = useState({
    nombreCompleto: '',
    id: ''


  });

  const [tipoUsuario, setTipoUsuario] = useState("")
  const [tutoriaEditar, setTutoriaEditar] = useState()
  const [accion, setAccion] = useState("")
  const [enviado, setEnviado] = useState(0)


  //alumnos para el select
  const buscarTodosAlumnos = async () => {
    TutoruvaService.buscarTodosAlumnos()
      .then(response => {
        setAlumnos(response.data)
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });




  }


  //profesores para el select
  const buscarTodosProfesores = async () => {
    TutoruvaService.buscarTodosProfesores()
      .then(response => {
        setProfesores(response.data)
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });




  }

  const verDatos = () => {
    console.log(getValues())
  }


  //notificacion
  const notify = (mensaje) => {
    console.log("entro al notify")
    toast.success(mensaje, {
      duration: 5000,
      position: "top-right",
      style: {
        background: "#AB1739",
        color: "#FFFFFF",
        fontSize: "25px"
      }
    })
  };


  const [alumnos, setAlumnos] = useState([])
  const [profesores, setProfesores] = useState([])
  const [cargador, setCargador] = useState(false)


  //envio el formulario
  const onSubmit = (data) => {
    console.log(data)
    console.log("envia")
    setCargador(true)

    if (accion == "Crear") {//si creas
      var estado, idalumnoparticipante, idprofesorparticipante, nombrecompletoprofesor, nombrecompletoalumno;
      if (tipoUsuario == "Alumno") {
        estado = "Pendiente de aceptar por el profesor"
        idalumnoparticipante = allValues.id
        nombrecompletoprofesor = data.profesorparticipante
        nombrecompletoalumno = allValues.nombreCompleto

        profesores.forEach(profesor => {
          if ((profesor.nombre + " " + profesor.apellidos) == data.profesorparticipante) {
            idprofesorparticipante = profesor.id

          }
        })

      } else {
        estado = "Pendiente de aceptar por el alumno"
        idprofesorparticipante = allValues.id
        nombrecompletoalumno = data.alumnoparticipante
        nombrecompletoprofesor = allValues.nombreCompleto
        alumnos.forEach(alumno => {
          if ((alumno.nombre + " " + alumno.apellidos) == data.alumnoparticipante) {
            idalumnoparticipante = alumno.id

          }
        })
      }


      var tutoria = {
        fecha: data.fecha,
        horainicio: data.horainicio,
        horafin: data.horafin,
        descripcion: data.descripcion,
        estadotutoria: estado,
        idprofesorparticipante: idprofesorparticipante,
        idalumnoparticipante: idalumnoparticipante,
        nombrecompletoalumno: nombrecompletoalumno,
        nombrecompletoprofesor: nombrecompletoprofesor,
        idcreador: allValues.id





      }



      TutoruvaService.crearTutoria(tutoria)
        .then(response => {

          console.log(response.data);

          console.log("muestro noticacion")


          setTimeout(() => {
            setCargador(false)
            setEnviado(1)
            notify("Tutoría creada")
          }, 3000)







          //navigate("/miUsuario")



        })
        .catch(e => {
          console.log(e);
        });
    } else {//si editas
      var estado
      if (tipoUsuario == "Alumno") {
        estado = "Pendiente de aceptar cambios por el profesor"
      } else {
        estado = "Pendiente de aceptar cambios por el alumno"
      }

      var tutoria = {
        fecha: data.fecha,
        horainicio: data.horainicio,
        horafin: data.horafin,
        descripcion: data.descripcion,
        estadotutoria: estado,
        idprofesorparticipante: tutoriaEditar.idprofesorparticipante,
        idalumnoparticipante: tutoriaEditar.idalumnoparticipante,
        idcreador: tutoriaEditar.idcreador





      }




      TutoruvaService.editarTutoria(
        id,
        tutoria

      )
        .then(response => {
          console.log(response.data);

          setTimeout(() => {
            setCargador(false)
            setEnviado(1)
            notify("Cambios propuestos")
          }, 3000)

        })
        .catch(e => {
          console.log(e);
        });
    }

  }

  return (
    <div className="exterior">
      <div className="container mx-auto flex flex-col justify-center items-center p-4">



        {/**titulo */}
        <div className="titulo flex justify-center items-center mt-5">

          {accion == "Crear" ? (
            <p className="text-center uppercase text-4xl font-bold underline bg-azul-uva p-5 rounded-lg text-blanco shadow-2xl">Crear tutoria</p>
          ) : (
            <p className="text-center uppercase text-4xl font-bold underline bg-azul-uva p-5 rounded-lg text-blanco shadow-2xl">Proponer cambios</p>
          )}

        </div>




        {/**formulario */}
        <form className="formulario w-full mt-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="fila grid md:grid-cols-3 grid-cols-1 gap-3 w-full ">
            <div className="entrada mt-4 w-full">
              <label for="fecha" className="titulo-mediano">Fecha</label>
              <input {...register("fecha")} type="date" id="fecha" class=" border   text-sm rounded-lg block w-full p-2.5 " />
              <p className="text-rojo">{errors.fecha?.message}</p>
            </div>


            <div className="entrada mt-4 w-full">
              <label for="fecha" className="titulo-mediano">Hora de inicio</label>
              <input {...register("horainicio")} type="time" id="fecha" class=" border   text-sm rounded-lg block w-full p-2.5 " />
              <p className="text-rojo">{errors.horainicio?.message}</p>
            </div>


            <div className="entrada mt-4 w-full">
              <label for="fecha" className="titulo-mediano">Hora de fin</label>
              <input {...register("horafin")} type="time" id="fecha" class=" border   text-sm rounded-lg block w-full p-2.5 " />
              <p className="text-rojo">{errors.horafin?.message}</p>
            </div>
          </div>


          <div className="fila grid grid-cols-1 gap-3 w-full mt-5">
            <div className="entrada mt-4 w-full">
              <label for="descripcion" className="titulo-mediano">Descripción</label>
              <textarea {...register("descripcion")} id="descripcion" class=" border   text-sm rounded-lg block w-full p-2.5 " />
              <p className="text-rojo">{errors.descripcion?.message}</p>
            </div>
          </div>




          {/**select alumno y profesor */}
          {tipoUsuario == "Profesor" &&
            <div className="fila grid md:grid-cols-2 grid-cols-1 gap-3 w-full mt-5 ">
              {accion == "Editar" ? (
                <div className="entrada mt-4 w-full">
                  <label for="profesor" className="titulo-mediano">Profesor participante</label>


                  <p>{tutoriaEditar.nombrecompletoprofesor}</p>

                </div>
              ) : (
                <div className="entrada mt-4 w-full">
                  <label for="profesor" className="titulo-mediano">Profesor participante</label>

                  <select {...register("profesorparticipante")} id="profesor" class=" border   text-sm rounded-lg block w-full p-2.5 " >
                    <option value={allValues.id}>{allValues.nombreCompleto}</option>
                  </select>
                  <p className="text-rojo">{errors.profesorparticipante?.message}</p>

                </div>
              )}


              {accion == "Editar" ? (
                <div className="entrada mt-4 w-full">
                  <label for="alumno" className="titulo-mediano">Alumno participante</label>

                  <p>{tutoriaEditar.nombrecompletoalumno}</p>
                </div>
              ) : (
                <div className="entrada mt-4 w-full">
                  <label for="alumno" className="titulo-mediano">Alumno participante</label>
                  <input list="alumnos" {...register("alumnoparticipante")} id="alumno" class=" border   text-sm rounded-lg block w-full p-2.5 " />
                  <datalist id="alumnos" >
                    {alumnos.map((elemento) =>
                      <option >
                        {elemento.nombre} {elemento.apellidos}
                      </option>
                    )}
                  </datalist>
                  <p className="text-rojo">{errors.alumnoparticipante?.message}</p>
                </div>
              )}



            </div>}


          <Toaster
            reverseOrder={false}
          />

          {tipoUsuario == "Alumno" &&
            <div className="fila grid md:grid-cols-2 grid-cols-1 gap-3 w-full mt-5 ">

              {accion == "Editar" ? (
                <div className="entrada mt-4 w-full">
                  <label for="profesor" className="titulo-mediano">Profesor participante</label>
                  <p>{tutoriaEditar.nombrecompletoprofesor}</p>


                </div>
              ) : (
                <div className="entrada mt-4 w-full">
                  <label for="profesor" className="titulo-mediano">Profesor participante</label>

                  <input list="profesores" {...register("profesorparticipante")} id="profesor" class=" border   text-sm rounded-lg block w-full p-2.5 " />
                  <datalist id="profesores" >
                    {profesores.map((elemento) =>
                      <option >
                        {elemento.nombre}  {elemento.apellidos}
                      </option>
                    )}
                  </datalist>
                  <p className="text-rojo">{errors.profesorparticipante?.message}</p>

                </div>
              )}





              {accion == "Editar" ? (
                <div className="entrada mt-4 w-full">
                  <label for="alumno" className="titulo-mediano">Alumno participante</label>

                  <p>{tutoriaEditar.nombrecompletoalumno}</p>
                </div>
              ) : (
                <div className="entrada mt-4 w-full">
                  <label for="alumno" className="titulo-mediano">Alumno participante</label>
                  <select {...register("alumnoparticipante")} id="alumno" class=" border   text-sm rounded-lg block w-full p-2.5 " >
                    <option value={allValues.id}>{allValues.nombreCompleto}</option>
                  </select>
                  <p className="text-rojo">{errors.alumnoparticipante?.message}</p>
                </div>
              )}



            </div>}




          {/**boton */}
          <div className="boton mt-5 flex justify-center items-center">
            {accion == "Editar" ? (
              <div>
                {cargador ? (
                  <ScaleLoader color="#0C1F4A" />
                ) : (
                  <div>
                    {!enviado &&
                      <button className="boton-azul">Proponer</button>
                    }
                  </div>
                )}
              </div>
            ) : (
              <div>
                {cargador ? (
                  <ScaleLoader color="#0C1F4A" />
                ) : (
                  <div>
                    {!enviado &&
                      <button className="boton-azul">Crear</button>
                    }
                  </div>

                )}
              </div>
            )}




          </div>
        </form>

      </div>
    </div>


  );

}
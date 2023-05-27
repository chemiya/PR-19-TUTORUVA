import React, { Component } from "react";
import FotoPrueba from "./../imagenes/profesor1.jpg"
import * as Yup from "yup";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import TutoruvaService from "../services/tutoruva.service";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { ScaleLoader } from "react-spinners";

export default function EditarPerfil() {
  const [formulario, setFormulario] = React.useState("");



  //schemas
  const schema1 = Yup.object().shape({

    password: Yup.string().min(4, "La contraseña debe tener al menos 4 caracteres.").max(20, "La contraseña debe tener como maximo 20 caracteres.").required("La contraseña es obligatoria."),
    email: Yup.string().email("El email es incorrecto.").required("El email de la UVa es obligatorio."),
    despacho: Yup.string().required("La localización del despacho es obligatoria."),
  })

  const schema2 = Yup.object().shape({
    password: Yup.string().min(4, "La contraseña debe tener al menos 4 caracteres.").max(20, "La contraseña debe tener como maximo 20 caracteres.").required("La contraseña es obligatoria."),
    email: Yup.string().email("El email es incorrecto.").required("El email de la UVa es obligatorio."),
    grado: Yup.string().required("Selecciona un grado."),


  })



  //inicio
  useEffect(() => {
    obtenerValores();




  }, []);

  const navigate = useNavigate()



  //buscar usuario
  const obtenerValores = async () => {
    const cookies = new Cookies();


    setAllValues({ ["tipo"]: cookies.get("tipo"), ["id"]: cookies.get("id") })



    if (cookies.get("tipo") == "Profesor") {
      buscarProfesor(cookies.get("id"))
    } else {
      buscarAlumno(cookies.get("id"))
    }



  }


  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const [cargador, setCargador] = useState(false)

  //carga fotos
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)


    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])





  const preset_key = "XXXXXXX"
  const cloud_name = "XXXXXXX"
  const [image, setImage] = useState()
  const [fotoRuta, setFotoRuta] = React.useState("");



  //cargar foto
  function handlefile(event) {
    const file = event.target.files[0]
    setImage(file)
    setSelectedFile(event.target.files[0])

  }








  //busquedas
  const buscarAlumno = (id) => {
    TutoruvaService.buscarAlumno(id)
      .then(response => {
        setUsuario(response.data)
        setFotoRuta(response.data.fotoRuta)
        setValue2("email", response.data.email);
        setValue2("password", response.data.password);
        setValue2("grado", response.data.grado);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }



  //envio
  const onSubmit1 = (data) => {
    console.log(data)
    var fotoRuta;
    setCargador(true)


    if (image != undefined) {//si hay foto
      const formData = new FormData();
      formData.append("file", image)
      formData.append("upload_preset", preset_key)
      axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
        .then(res => {
          console.log(res)
          fotoRuta = (res.data.secure_url)
          var profesor = {
            password: data.password,
            despacho: data.despacho,
            email: data.email,
            fotoRuta: fotoRuta
          }

          console.log("profesor enviado:")
          console.log(profesor)

          TutoruvaService.editarProfesor(
            allValues.id,
            profesor
          )
            .then(response => {
              console.log(response.data);


              //aviso y cargador
              setTimeout(() => {
                setCargador(false)
                notify()
              }, 3000)

            })
            .catch(e => {
              console.log(e);
            });


        })
        .catch(err => console.log(err))
    } else {//sin foto



      var profesor = {
        password: data.password,
        despacho: data.despacho,
        email: data.email,
        fotoRuta: fotoRuta
      }

      console.log("profesor enviado:")
      console.log(profesor)

      TutoruvaService.editarProfesor(
        allValues.id,
        profesor
      )
        .then(response => {
          console.log(response.data);
          //aviso y cargador
          setTimeout(() => {
            setCargador(false)
            notify()
          }, 3000)

        })
        .catch(e => {
          console.log(e);
        });



    }




  }



  //notificacion
  const notify = () => {
    console.log("entro al notify")
    toast.success('Cambios guardados con éxito.', {
      duration: 5000,
      position: "top-right",
      style: {
        background: "#AB1739",
        color: "#FFFFFF",
        fontSize: "25px"
      }
    })
  };






  //envio
  const onSubmit2 = (data) => {

    setCargador(true)
    console.log(data)
    var fotoRuta;


    if (image != undefined) {//sin foto
      const formData = new FormData();
      formData.append("file", image)
      formData.append("upload_preset", preset_key)
      axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
        .then(res => {
          console.log(res)
          fotoRuta = (res.data.secure_url)
          console.log(data)
          var alumno = {
            password: data.password,
            grado: data.grado,
            email: data.email,
            fotoRuta: fotoRuta
          }


          TutoruvaService.editarAlumno(
            allValues.id,
            alumno
          )
            .then(response => {
              console.log(response.data);


              setTimeout(() => {
                setCargador(false)
                notify()
              }, 3000)

            })
            .catch(e => {
              console.log(e);
            });

        })
        .catch(err => console.log(err))
    } else {


      console.log(data)
      var alumno = {
        password: data.password,
        grado: data.grado,
        email: data.email,
        fotoRuta: fotoRuta
      }


      TutoruvaService.editarAlumno(
        allValues.id,
        alumno
      )
        .then(response => {
          console.log(response.data);

          setTimeout(() => {
            setCargador(false)
            notify()
          }, 3000)


        })
        .catch(e => {
          console.log(e);
        });


    }




  }




  //buscar
  const buscarProfesor = (id) => {
    TutoruvaService.buscarProfesor(id)
      .then(response => {
        setUsuario(response.data)
        console.log("tengo")
        setFotoRuta(response.data.fotoRuta)
        setValue1("email", response.data.email);
        setValue1("password", response.data.password);
        setValue1("despacho", response.data.despacho);
        console.log(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  }

  const [allValues, setAllValues] = useState({
    tipo: '',
    id: ''


  });

  const [usuario, setUsuario] = useState();




  //formularios
  const { register: register1, handleSubmit: handleSubmit1, setValue: setValue1, formState: { errors: errors1 } } = useForm({
    resolver: yupResolver(schema1)
  });

  const { register: register2, handleSubmit: handleSubmit2, setValue: setValue2, formState: { errors: errors2 } } = useForm({
    resolver: yupResolver(schema2)
  });


  return (
    <div className="exterior">
      <div className="datos-usuario mt-5">


        {/**titulo */}
        <div className="titulo flex justify-center items-center">
          <h1 className="text-center uppercase text-4xl font-bold underline bg-azul-uva p-5 rounded-lg text-blanco shadow-2xl">Editar perfil</h1>
        </div>






        {/**si profesor */}
        {allValues.tipo == "Profesor" &&
          <form onSubmit={handleSubmit1(onSubmit1)}>


            <div className="container flex flex-col justify-center items-center mx:auto md:flex-row">
              <div className="imagen-columna p-4 md:w-1/2 w-full flex flex-col justify-center items-center">
                <p className="titulo-mediano">Foto</p>


                {selectedFile ? (<img src={preview} className="imagen-usuario" />) : (<img src={fotoRuta} className="imagen-usuario" />)}
                <div className="p-2 ">
                  <input type="file" onChange={handlefile} />

                </div>



              </div>



              <div className="descripcion-columna flex flex-col items-start p-4 md:w-1/2 w-full">
                <div className="entrada  w-full">
                  <label for="password" className="titulo-mediano">Contraseña</label>
                  <input {...register1("password")} type="password" id="password" class=" border   text-sm rounded-lg block w-full p-2.5 " />
                  <p className="text-rojo">{errors1.password?.message}</p>
                </div>

                <div className="entrada mt-4 w-full">
                  <label for="email" className="titulo-mediano">Email de la UVa</label>
                  <input {...register1("email")} type="text" id="email" class=" border   text-sm rounded-lg block w-full p-2.5 " />
                  <p className="text-rojo">{errors1.email?.message}</p>
                </div>



                <div className="entrada mt-4 w-full">
                  <label for="despacho" className="titulo-mediano">Localización despacho</label>
                  <input {...register1("despacho")} type="text" id="despacho" class=" border   text-sm rounded-lg block w-full p-2.5 " />
                  <p className="text-rojo">{errors1.despacho?.message}</p>
                </div>







              </div>

            </div>

            <div className="boton flex justify-center items-center">
              {cargador ? (
                <ScaleLoader color="#0C1F4A" />
              ) : (
                <button className="boton-azul">Editar</button>
              )}

            </div>





          </form>
        }






        <Toaster
          reverseOrder={false}
        />








        {/**si alumno */}
        {allValues.tipo == "Alumno" &&
          <form onSubmit={handleSubmit2(onSubmit2)}>

            <div className="container flex flex-col justify-center items-center mx:auto md:flex-row">
              <div className="imagen-columna p-4 md:w-1/2 w-full flex flex-col justify-center items-center">
                <p className="titulo-mediano">Foto</p>
                {selectedFile ? (<img src={preview} className="imagen-usuario" />) : (<img src={fotoRuta} className="imagen-usuario" />)}
                <div className="p-2 ">
                  <input type="file" onChange={handlefile} />

                </div>
              </div>








              <div className="descripcion-columna flex flex-col items-start p-4 md:w-1/2 w-full">
                <div className="entrada  w-full">
                  <label for="password" className="titulo-mediano">Contraseña</label>
                  <input {...register2("password")} type="password" id="password" class=" border   text-sm rounded-lg block w-full p-2.5 " />
                  <p className="text-rojo">{errors2.password?.message}</p>
                </div>

                <div className="entrada mt-4 w-full">
                  <label for="email" className="titulo-mediano">Email de la UVa</label>
                  <input {...register2("email")} type="text" id="email" class=" border   text-sm rounded-lg block w-full p-2.5 " />
                  <p className="text-rojo">{errors2.email?.message}</p>
                </div>



                <div className="entrada mt-4 w-full">
                  <label for="despacho" className="titulo-mediano">Grado que estudias</label>
                  <select {...register2("grado")} id="grado" class=" border  text-sm rounded-lg  block w-full p-2.5 " >
                    <option></option>
                    <option>Grado en Ingeniería Informática</option>
                    <option>Grado en Ingeniería Industrial</option>
                    <option>Grado en Administración y Dirección de Empresas</option>
                    <option>Grado en Magisterio</option>
                    <option>Grado en Matemáticas</option>
                    <option>Grado en Física</option>
                    <option>Grado en Derecho</option>
                    <option>Grado en Comercio</option>

                  </select>
                  <p className="text-rojo">{errors2.grado?.message}</p>
                </div>

              </div>

            </div>




            <div className="boton flex justify-center items-center">
              {cargador ? (
                <ScaleLoader color="#0C1F4A" />
              ) : (
                <button className="boton-azul">Editar</button>
              )}

            </div>

          </form>

        }


      </div>
    </div>
  );
}


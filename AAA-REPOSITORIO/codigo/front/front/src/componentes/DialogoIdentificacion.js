import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Field, Form, ErrorMessage, setIn } from "formik";

import { useState } from "react";
import { useNavigate } from 'react-router-dom'

import * as Yup from "yup";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import TutoruvaService from "../services/tutoruva.service";
import Cookies from 'universal-cookie';


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [incorrecto, setIncorrecto] = React.useState(false);
  const navigate = useNavigate()


  //schema
  const schema = Yup.object().shape({
    usuariouva: Yup.string().required("El usuario de la UVa es obligatorio."),
    password: Yup.string().min(4, "La contraseña debe tener al menos 4 caracteres.").max(20, "La contraseña debe tener como maximo 20 caracteres.").required("La contraseña es obligatoria.")

  })


  //formulario
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });



  //envio
  const onSubmit = (data) => {


    TutoruvaService.identificarAlumno(data.usuariouva, data.password)
      .then(response => {

        if (response.data.length == 0) {
          TutoruvaService.identificarProfesor(data.usuariouva, data.password)
            .then(response => {

              if (response.data.length == 0) {
                console.log("incorrecto")
                setIncorrecto(true)
              } else {
                console.log("identifiacdo como profesor")
                console.log(response.data)
                const cookies = new Cookies();


                //guardo cookies
                cookies.set('id', response.data[0].id, { path: '/' });
                cookies.set('tipo', "Profesor", { path: '/' });
                cookies.set('nombreCompleto', response.data[0].nombre + " " + response.data[0].apellidos, { path: '/' });
                navigate("/miUsuario")
              }

            })
            .catch(e => {
              console.log(e);
            });
        } else {
          console.log("identifiacdo como alumno")
          console.log(response.data)
          const cookies = new Cookies();


          //guardo cookies
          cookies.set('id', response.data[0].id, { path: '/' });
          cookies.set('tipo', "Alumno", { path: '/' });
          cookies.set('nombreCompleto', response.data[0].nombre + " " + response.data[0].apellidos, { path: '/' });
          navigate("/miUsuario")

        }

      })
      .catch(e => {
        console.log(e);
      });
  }



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };





  return (
    <div>


      {/*boton */}
      <button className='boton-blanco' onClick={handleClickOpen}>
        Iniciar sesión
      </button>
      <Dialog open={open} onClose={handleClose}>
        <div className='container p-4 flex flex-col mx-auto'>






          {/*formulario */}
          <form onSubmit={handleSubmit(onSubmit)}>


            <div className='interior-formulario flex flex-col justify-center items-center'>
              <p className='titulo-grande'>Identifícate en TutorUva</p>
              <div class="grid gap-6 p-2 md:grid-cols-1 mt-3 w-full">
                <div>
                  <label for="usuariouva" class="block mb-2 text-md font-medium">Usuario de la UVa</label>
                  <input {...register("usuariouva")} type="text" id="usuariouva" class=" border   text-md rounded-lg block w-full p-2.5 " />
                  <p className='text-rojo'>{errors.usuariouva?.message}</p>
                </div>
                <div>
                  <label for="password" class="block mb-2 text-md font-medium ">Contraseña</label>
                  <input {...register("password")} type="password" id="password" class=" border   text-md rounded-lg  block w-full p-2.5 " />
                  <p className='text-rojo'>{errors.password?.message}</p>
                </div>


              </div>


              {/*incorrecto */}
              {incorrecto && <p className='text-rojo p-3'>Usuario y contraseña incorrectos</p>}

              <div className='boton'>
                <button className='boton-azul'>Iniciar sesión</button>
              </div>


            </div>
          </form>








        </div>
        {/*
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>*/}
      </Dialog>
    </div>
  );
}
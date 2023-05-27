import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import TutoruvaService from "../services/tutoruva.service";
import DialogoIdentificacion from "./DialogoIdentificacion"


export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [formulario, setFormulario] = React.useState("");
    const [seleccionTipo, setSeleccionTipo] = React.useState(true);
    const [enviado, setEnviado] = React.useState(false);


    //schemas
    const schema1 = Yup.object().shape({
        usuariouva: Yup.string().required("El usuario de la UVa es obligatorio."),
        password: Yup.string().min(4, "La contraseña debe tener al menos 4 caracteres.").max(20, "La contraseña debe tener como maximo 20 caracteres.").required("La contraseña es obligatoria."),
        email: Yup.string().email("El email es incorrecto.").required("El email de la UVa es obligatorio."),
        nombre: Yup.string().required("El nombre es obligatorio."),
        apellidos: Yup.string().required("Los apellidos son obligatorios."),
        despacho: Yup.string().required("La localización del despacho es obligatoria."),


    })

    const schema2 = Yup.object().shape({
        usuariouva: Yup.string().required("El usuario de la UVa es obligatorio."),
        password: Yup.string().min(4, "La contraseña debe tener al menos 4 caracteres.").max(20, "La contraseña debe tener como maximo 20 caracteres.").required("La contraseña es obligatoria."),
        email: Yup.string().email("El email es incorrecto.").required("El email de la UVa es obligatorio."),
        nombre: Yup.string().required("El nombre es obligatorio."),
        apellidos: Yup.string().required("Los apellidos son obligatorios."),
        grado: Yup.string().required("Selecciona un grado."),


    })





    //formularios
    const { register: register1, handleSubmit: handleSubmit1, formState: { errors: errors1 } } = useForm({
        resolver: yupResolver(schema1)
    });





    //envio
    const onSubmit1 = (data) => {
        var profesor = {
            usuariouva: data.usuariouva,
            password: data.password,
            email: data.email,
            despacho: data.despacho,
            nombre: data.nombre,
            apellidos: data.apellidos


        }


        TutoruvaService.registrarProfesor(profesor)
            .then(response => {

                setEnviado(true);
            })
            .catch(e => {
                console.log(e);
            });

    }




    //formulario
    const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 } } = useForm({
        resolver: yupResolver(schema2)
    });






    //envio
    const onSubmit2 = (data) => {
        var alumno = {
            usuariouva: data.usuariouva,
            password: data.password,
            email: data.email,
            grado: data.grado,
            nombre: data.nombre,
            apellidos: data.apellidos


        }


        TutoruvaService.registrarAlumno(alumno)
            .then(response => {

                setEnviado(true);
            })
            .catch(e => {
                console.log(e);
            });
    }





    //navbar
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




    //seleccion
    const seleccionProfesor = () => {
        setFormulario("Profesor");
        setSeleccionTipo(false);
    };

    const seleccionAlumno = () => {
        setFormulario("Alumno");
        setSeleccionTipo(false);
    };



    return (
        <div>


            {/*boton */}
            <button className='boton-blanco' onClick={handleClickOpen}>
                Registro
            </button>
            <Dialog open={open} onClose={handleClose}>
                <div className='container p-4 flex flex-col mx-auto'>





                    {/*tipo */}
                    {seleccionTipo == true &&
                        <div className='seleccion-tipo'>
                            <div className='titulo'>
                                <p className="titulo-grande">Regístrate en TutorUVa</p>
                            </div>
                            <p className='text-center'>¿Eres alumno o profesor?</p>
                            <div className='seleccion-tipo-cajas flex flex-row justify-center items-center'>
                                <div className='caja p-3'>
                                    <div className='interior-caja bg-azul-uva rounded-lg p-3 hover:bg-morado-uva cursor-pointer hover:scale-105' onClick={seleccionProfesor}>
                                        <p className='text-blanco'>Profesor</p>
                                    </div>

                                </div>

                                <div className='caja p-3'>
                                    <div className='interior-caja bg-azul-uva rounded-lg p-3 hover:bg-morado-uva cursor-pointer hover:scale-105' onClick={seleccionAlumno}>
                                        <p className='text-blanco'>Alumno</p>
                                    </div>

                                </div>


                            </div>
                        </div>
                    }






                    {/*formularios */}
                    {seleccionTipo == false &&
                        <div className='formulario'>
                            {(formulario == "Profesor" && enviado == false) &&
                                <form onSubmit={handleSubmit1(onSubmit1)}>

                                    <div className='interior-formulario flex flex-col justify-center items-center'>
                                        <p className='titulo-grande'>Rellena la información de profesor</p>
                                        <div class="grid gap-6 p-2 md:grid-cols-2 mt-3 w-full">
                                            <div>
                                                <label for="usuariouva" class="block mb-2 text-md font-medium">Usuario de la UVa</label>
                                                <input  {...register1("usuariouva")} type="text" id="usuariouva" class=" border   text-md rounded-lg block w-full p-2.5 " />
                                                <p className='text-rojo'>{errors1.usuariouva?.message}</p>
                                            </div>
                                            <div>
                                                <label for="password" class="block mb-2 text-md font-medium ">Contraseña</label>
                                                <input  {...register1("password")} type="password" id="password" class=" border   text-md rounded-lg  block w-full p-2.5 " />
                                                <p className='text-rojo'>{errors1.password?.message}</p>
                                            </div>
                                            <div>
                                                <label for="nombre" class="block mb-2 text-md font-medium ">Nombre</label>
                                                <input  {...register1("nombre")} type="text" id="nombre" class=" border  text-md rounded-lg  block w-full p-2.5 " />
                                                <p className='text-rojo'>{errors1.nombre?.message}</p>
                                            </div>
                                            <div>
                                                <label for="apellidos" class="block mb-2 text-md font-medium">Apellidos</label>
                                                <input  {...register1("apellidos")} type="text" id="apellidos" class=" border  text-md rounded-lg  block w-full p-2.5 " />
                                                <p className='text-rojo'>{errors1.apellidos?.message}</p>
                                            </div>
                                            <div>
                                                <label for="email" class="block mb-2 text-md font-medium ">Email de la UVa</label>
                                                <input  {...register1("email")} type="text" id="email" class=" border  text-md rounded-lg  block w-full p-2.5 " />
                                                <p className='text-rojo'>{errors1.email?.message}</p>
                                            </div>
                                            <div>
                                                <label for="despacho" class="block mb-2 text-md font-medium ">Localización del despacho</label>
                                                <input  {...register1("despacho")} type="text" id="despacho" class=" border  text-md rounded-lg  block w-full p-2.5 " />
                                                <p className='text-rojo'>{errors1.despacho?.message}</p>
                                            </div>
                                        </div>

                                        <div className='boton'>
                                            <button className='boton-azul'>Registrarse</button>
                                        </div>

                                    </div>


                                </form>



                            }






                            {(formulario == "Alumno" && enviado == false) &&

                                <form onSubmit={handleSubmit2(onSubmit2)}>
                                    <div className='interior-formulario flex flex-col justify-center items-center'>
                                        <p className='titulo-grande'>Rellena la información de alumno</p>
                                        <div class="grid gap-6 p-2 md:grid-cols-2 mt-3 w-full">
                                            <div>
                                                <label for="usuario-uva" class="block mb-2 text-md font-medium">Usuario de la UVa</label>
                                                <input {...register2("usuariouva")} type="text" id="usuario-uva" class=" border   text-md rounded-lg block w-full p-2.5 " />
                                                <p className='text-rojo'>{errors2.usuariouva?.message}</p>
                                            </div>
                                            <div>
                                                <label for="password" class="block mb-2 text-md font-medium ">Contraseña</label>
                                                <input {...register2("password")} type="password" id="password" class=" border   text-md rounded-lg  block w-full p-2.5 " />
                                                <p className='text-rojo'>{errors2.password?.message}</p>
                                            </div>
                                            <div>
                                                <label for="nombre" class="block mb-2 text-md font-medium ">Nombre</label>
                                                <input {...register2("nombre")} type="text" id="nombre" class=" border  text-md rounded-lg  block w-full p-2.5 " />
                                                <p className='text-rojo'>{errors2.nombre?.message}</p>
                                            </div>
                                            <div>
                                                <label for="apellidos" class="block mb-2 text-md font-medium">Apellidos</label>
                                                <input  {...register2("apellidos")} type="text" id="apellidos" class=" border  text-md rounded-lg  block w-full p-2.5 " />
                                                <p className='text-rojo'>{errors2.apellidos?.message}</p>
                                            </div>
                                            <div>
                                                <label for="email" class="block mb-2 text-md font-medium ">Email de la UVa</label>
                                                <input {...register2("email")} type="text" id="email" class=" border  text-md rounded-lg  block w-full p-2.5 " />
                                                <p className='text-rojo'>{errors2.email?.message}</p>
                                            </div>
                                            <div>
                                                <label for="grado" class="block mb-2 text-md font-medium ">Grado que estudias</label>
                                                <select {...register2("grado")} id="grado" class=" border  text-md rounded-lg  block w-full p-2.5 " >
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
                                                <p className='text-rojo'>{errors2.grado?.message}</p>
                                            </div>
                                        </div>

                                        <div className='boton'>
                                            <button className='boton-azul' >Registrarse</button>
                                        </div>

                                    </div>
                                </form>

                            }
                        </div>


                    }







                    {/*envio */}
                    {enviado == true && <div className='flex flex-col justify-center items-center'>
                        <p className='titulo-grande mb-2'>Te has registrado con éxito</p>

                        <buttom className="boton-azul" onClick={handleClose}>
                            Volver
                        </buttom>

                    </div>}



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
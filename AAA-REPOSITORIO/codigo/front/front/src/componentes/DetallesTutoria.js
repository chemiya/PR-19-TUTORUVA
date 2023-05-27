import React, { Component } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import TutoruvaService from "../services/tutoruva.service";
import Cookies from 'universal-cookie';
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { withRouter } from '../common/with-router';
import toast, { Toaster } from 'react-hot-toast';


class DetallesTutoria extends Component {

    constructor(props) {
        super(props);
        this.clickAceptar = this.clickAceptar.bind(this);
        this.clickRechazar = this.clickRechazar.bind(this);
        this.clickProponerCambios = this.clickProponerCambios.bind(this);



        this.state = {
            tutoria: "",
            barraBotones: false

        };
    }

    componentDidMount() {
        console.log(this.props)
        this.buscarTutoria()
    }


    buscarTutoria() {
        const cookies = new Cookies();
        TutoruvaService.buscarTutoria(this.props.router.params.id)
            .then(response => {
                this.setState({
                    tutoria: response.data
                });
                console.log("encontrada")
                console.log(response.data);

                if (cookies.get("tipo") == "Profesor") {
                    if (cookies.get("id") == response.data.idprofesorparticipante) {
                        if (response.data.estadotutoria == "Pendiente de aceptar por el profesor" || response.data.estadotutoria == "Pendiente de aceptar cambios por el profesor") {
                            this.setState({
                                barraBotones: true
                            });
                        }
                    }
                }



                if (cookies.get("tipo") == "Alumno") {
                    if (cookies.get("id") == response.data.idalumnoparticipante) {
                        if (response.data.estadotutoria == "Pendiente de aceptar por el alumno" || response.data.estadotutoria == "Pendiente de aceptar cambios por el alumno") {
                            this.setState({
                                barraBotones: true
                            });
                        }
                    }
                }



            })
            .catch(e => {
                console.log(e);
            });
    }


    clickAceptar() {

        this.state.tutoria.estadotutoria = "Aceptada"
        TutoruvaService.editarTutoria(
            this.props.router.params.id,
            this.state.tutoria

        )
            .then(response => {
                console.log(response.data);
                //this.props.router.navigate('/miUsuario');
                this.notify("Tutoría aceptada")
                this.setState({
                    barraBotones: false
                });

            })
            .catch(e => {
                console.log(e);
            });
    }

      //notificacion
  notify(texto) {
    console.log("entro al notify")
    toast.success(texto, {
      duration: 5000,
      position: "top-right",
      style: {
        background: "#AB1739",
        color: "#FFFFFF",
        fontSize: "25px"
      }
    })
  };


    clickRechazar() {
        this.state.tutoria.estadotutoria = "Rechazada"
        TutoruvaService.editarTutoria(
            this.props.router.params.id,
            this.state.tutoria

        )
            .then(response => {
                console.log(response.data);
                this.notify("Tutoría rechazada")
                this.setState({
                    barraBotones: false
                });

            })
            .catch(e => {
                console.log(e);
            });
    }

    clickProponerCambios() {
        this.props.router.navigate('/crearTutoria/' + this.state.tutoria.id);
    }


    render() {
        const { tutoria, barraBotones } = this.state;
        return (
            <div className="exterior">
                <div className="container mx-auto flex flex-col justify-center  items-center p-4">
                    <div className="titulo flex justify-center items-center mt-5">
                        <h1 className="text-center uppercase text-4xl font-bold underline bg-azul-uva p-5 rounded-lg text-blanco shadow-2xl">Detalles de la tutoría</h1>
                    </div>



                    <div className="formulario w-full mt-10" >
                        <div className="fila grid md:grid-cols-3 grid-cols-1 gap-3 w-full ">
                            <div className="entrada mt-4 w-full flex flex-col justify-center items-center">
                                <label for="fecha" className="text-2xl font-bold bg-azul-uva rounded-lg text-blanco p-2">Fecha</label>
                                <p className="mt-3">{tutoria.fecha}</p>
                            </div>


                            <div className="entrada mt-4 w-full flex flex-col justify-center items-center">
                                <label for="fecha" className="text-2xl font-bold bg-azul-uva rounded-lg text-blanco p-2">Hora de inicio</label>
                                <p className="mt-3">{tutoria.horainicio}</p>
                            </div>


                            <div className="entrada mt-4 w-full flex flex-col justify-center items-center">
                                <label for="fecha" className="text-2xl font-bold bg-azul-uva rounded-lg text-blanco p-2">Hora de fin</label>
                                <p className="mt-3">{tutoria.horafin}</p>
                            </div>
                        </div>


                        <div className="fila grid grid-cols-1 md:grid-cols-2 gap-3 w-full mt-5">
                            <div className="entrada mt-4 w-full flex flex-col justify-center items-center">
                                <label for="descripcion" className="text-2xl font-bold bg-azul-uva rounded-lg text-blanco p-2">Descripcion</label>
                                <p className="mt-3">{tutoria.descripcion}</p>
                            </div>

                            <div className="entrada mt-4 w-full flex flex-col justify-center items-center">
                                <label for="descripcion" className="text-2xl font-bold bg-azul-uva rounded-lg text-blanco p-2">Estado</label>
                                <p className="mt-3">{tutoria.estadotutoria}</p>
                            </div>
                        </div>








                        <div className="fila grid md:grid-cols-2 grid-cols-1 gap-3 w-full mt-5 ">
                            <div className="entrada mt-4 w-full flex flex-col justify-center items-center">
                                <label for="profesor" className="text-2xl font-bold bg-azul-uva rounded-lg text-blanco p-2">Profesor participante</label>

                                <p className="mt-3">{tutoria.nombrecompletoprofesor}</p>


                            </div>


                            <div className="entrada mt-4 w-full flex flex-col justify-center items-center">
                                <label for="alumno" className="text-2xl font-bold bg-azul-uva rounded-lg text-blanco p-2">Alumno participante</label>
                                <p className="mt-3">{tutoria.nombrecompletoalumno}</p>

                            </div>


                        </div>


                        {barraBotones &&
                            <div className="boton mt-16 flex justify-center items-center">
                                <button onClick={this.clickAceptar} className="bg-verde px-7 font-bold text-2xl py-3 rounded-full   hover:scale-105 cursor-pointer  m-3">Aceptar</button>
                                <button onClick={this.clickRechazar} className="bg-rojo px-7 font-bold text-2xl py-3 rounded-full   hover:scale-105 cursor-pointer m-3">Rechazar</button>
                                <button onClick={this.clickProponerCambios} className="boton-azul m-3">Proponer cambios</button>
                            </div>
                        }

                    </div>

                    <Toaster
          reverseOrder={false}
        />

                </div>
            </div>


        );

    }
}

export default withRouter(DetallesTutoria);
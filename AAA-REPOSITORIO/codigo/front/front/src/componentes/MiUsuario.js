import React, { Component } from "react";
import FotoPrueba from "./../imagenes/profesor1.jpg"
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Cookies from 'universal-cookie';
import TutoruvaService from "../services/tutoruva.service";
import { withRouter } from '../common/with-router';


const navigation = [
  { name: 'Buscar alumno', href: '/buscadorAlumno', current: false },
  { name: 'Crear tutoria', href: '/crearTutoria', current: false },

]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


class MiUsuario extends Component {

  constructor(props) {
    super(props);
    this.editarPerfil = this.editarPerfil.bind(this);
    this.misAlumnos = this.misAlumnos.bind(this);
    this.misProfesores = this.misProfesores.bind(this);
    this.misTutorias = this.misTutorias.bind(this);
    this.cerrarSesion = this.cerrarSesion.bind(this);



    this.state = {
      currentAlumno: {
        usuariouva: "",
        password: "",
        email: "",
        nombre: "",
        apellidos: "",
        grado: "",
        fotoRuta: ""
      },
      currentProfesor: {
        usuariouva: "",
        password: "",
        email: "",
        nombre: "",
        apellidos: "",
        despacho: "",
        fotoRuta: ""
      },
      tipo: ""

    };
  }



  //cerrar
  cerrarSesion() {
    const cookies = new Cookies();
    cookies.remove("id")
    cookies.remove("tipo")
    cookies.remove("nombreCompleto")
    this.props.router.navigate('/');
  }




  //navegaciones
  editarPerfil() {
    this.props.router.navigate('/editarPerfil');
  }

  misAlumnos() {
    this.props.router.navigate('/misAlumnos');
  }

  misProfesores() {
    this.props.router.navigate('/misProfesores');
  }

  misTutorias() {
    this.props.router.navigate('/misTutorias');
  }



  //inicio busco usuario
  componentDidMount() {
    console.log(this.props)
    const cookies = new Cookies();
    if (cookies.get("tipo") == "Alumno") {
      this.buscarAlumno(cookies.get("id"));
      this.setState({
        tipo: "Alumno"
      });
    } else {
      this.buscarProfesor(cookies.get("id"));
      this.setState({
        tipo: "Profesor"
      });
    }


  }





  //busquedas
  buscarAlumno(id) {
    TutoruvaService.buscarAlumno(id)
      .then(response => {
        this.setState({
          currentAlumno: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  buscarProfesor(id) {
    TutoruvaService.buscarProfesor(id)
      .then(response => {
        this.setState({
          currentProfesor: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }





  render() {
    return (
      <div className="exterior">


        {/*barra nav */}
        <Disclosure as="nav" className="bg-azul-uva ">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6 text-blanco" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6 text-blanco" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end ">

                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4 ">

                        {this.state.tipo == "Profesor" ? (
                          <a

                            href="/buscadorAlumno"
                            className="rounded-md px-3 py-2 text-md font-medium bg-blanco hover:bg-morado-uva hover:text-blanco"

                          >
                            Buscar alumno
                          </a>
                        ) : (
                          <a

                            href="/buscadorProfesor"
                            className="rounded-md px-3 py-2 text-md font-medium bg-blanco hover:bg-morado-uva hover:text-blanco"

                          >
                            Buscar profesor
                          </a>
                        )}



                        <a

                          href="/crearTutoria/nueva"
                          className="rounded-md px-3 py-2 text-md font-medium bg-blanco hover:bg-morado-uva hover:text-blanco"

                        >
                          Crear tutoría
                        </a>

                        <a


                          className="cursor-pointer rounded-md px-3 py-2 text-md font-medium bg-blanco hover:bg-morado-uva hover:text-blanco"
                          onClick={this.cerrarSesion}
                        >
                          Cerrar sesión
                        </a>

                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col justify-start items-start">
                  {this.state.tipo == "Profesor" ? (
                    <a

                      href="/buscadorAlumno"
                      className="rounded-md px-3 py-2 text-md font-medium bg-blanco hover:bg-morado-uva hover:text-blanco"

                    >
                      Buscar alumno
                    </a>
                  ) : (
                    <a

                      href="/buscadorProfesor"
                      className="rounded-md px-3 py-2 text-md font-medium bg-blanco hover:bg-morado-uva hover:text-blanco"

                    >
                      Buscar profesor
                    </a>
                  )}



                  <a

                    href="/crearTutoria/nueva"
                    className="rounded-md px-3 py-2 text-md font-medium bg-blanco hover:bg-morado-uva hover:text-blanco"

                  >
                    Crear tutoría
                  </a>

                  <a


                    className="cursor-pointer rounded-md px-3 py-2 text-md font-medium bg-blanco hover:bg-morado-uva hover:text-blanco"
                    onClick={this.cerrarSesion}
                  >
                    Cerrar sesión
                  </a>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>







        <div className="descripcion-usuario">


          <div className="container flex flex-col justify-center items-center mx-auto md:flex-row">




            {/**imagen usuario */}
            <div className="imagen-columna p-4 md:w-1/2  w-full flex flex-col justify-center items-center">
              {this.state.tipo == "Alumno" &&
                <img src={this.state.currentAlumno.fotoRuta} className="imagen-usuario" />
              }

              {this.state.tipo == "Profesor" &&
                <img src={this.state.currentProfesor.fotoRuta} className="imagen-usuario" />
              }


            </div>




            {/**datos */}
            {this.state.tipo == "Alumno" &&
              <div className="descripcion-columna flex justify-center items-center p-4 md:w-1/2 w-full">
                <div className="contenido flex flex-col   md:items-start items-center">
                  <p className="titulo-grande md:text-start text-center">{this.state.currentAlumno.nombre} {this.state.currentAlumno.apellidos}</p>
                  <p className="titulo-mediano">Alumno de la UVa</p>
                  <p className="titulo-mediano">{this.state.currentAlumno.email}</p>
                  <p className="titulo-mediano">{this.state.currentAlumno.grado} </p>
                  <button className="boton-azul" onClick={this.editarPerfil}>Editar perfil</button>
                </div>
              </div>
            }

            {this.state.tipo == "Profesor" &&

              <div className="descripcion-columna flex justify-center items-center p-4 md:w-1/2 w-full">
                <div className="contenido flex flex-col   md:items-start items-center">
                  <p className="titulo-grande">{this.state.currentProfesor.nombre} {this.state.currentProfesor.apellidos}</p>
                  <p className="titulo-mediano">Profesor de la UVa</p>
                  <p className="titulo-mediano">{this.state.currentProfesor.email}</p>
                  <p className="titulo-mediano">{this.state.currentProfesor.despacho} </p>
                  <button className="boton-azul" onClick={this.editarPerfil}>Editar perfil</button>
                </div>


              </div>
            }



          </div>
        </div>






        {/**botones */}
        <div className="botones-gestiones">
          <div className="container flex flex-col justify-center items-center mx:auto md:flex-row mx-auto ">
            <div className="columna-boton p-3 md:w-1/2 w-full flex justify-center items-center ">
              {this.state.tipo == "Profesor" &&
                <div className="bg-azul-uva rounded-lg p-10 md:w-3/4 w-full hover:bg-morado-uva hover:scale-105 cursor-pointer flex flex-col justify-center items-center" onClick={this.misAlumnos}>
                  <FontAwesomeIcon icon={faGraduationCap} className="text-4xl text-blanco mb-3" />
                  <p className="text-blanco text-4xl font-bold text-center">Mis alumnos</p>

                </div>
              }

              {this.state.tipo == "Alumno" &&
                <div className="bg-azul-uva rounded-lg p-10 md:w-3/4 w-full hover:bg-morado-uva hover:scale-105 cursor-pointer flex flex-col justify-center items-center" onClick={this.misProfesores}>
                  <FontAwesomeIcon icon={faGraduationCap} className="text-4xl text-blanco mb-3" />
                  <p className="text-blanco text-4xl font-bold text-center">Mis profesores</p>

                </div>
              }

            </div>


            <div className="columna-boton p-3 md:w-1/2 w-full flex justify-center items-center ">
              <div className="bg-azul-uva rounded-lg p-10 md:w-3/4 w-full hover:bg-morado-uva hover:scale-105 cursor-pointer flex flex-col justify-center items-center" onClick={this.misTutorias}>
                <FontAwesomeIcon icon={faChalkboardTeacher} className="text-4xl text-blanco mb-3" />
                <p className="text-blanco text-4xl font-bold text-center">Mis tutorías</p>

              </div>
            </div>
          </div>
        </div>



        <div>


        </div>

      </div>
    );
  }
}

export default withRouter(MiUsuario);
import React, { Component } from "react";
import FotoPrueba from "./../imagenes/profesor1.jpg"
import Cookies from 'universal-cookie';
import TutoruvaService from "../services/tutoruva.service";
import toast, { Toaster } from 'react-hot-toast';
import { ScaleLoader } from "react-spinners";




export default class Carta extends Component {
  constructor(props) {
    super(props);
    this.guardarAlumno = this.guardarAlumno.bind(this);
    this.eliminarGuardarAlumno = this.eliminarGuardarAlumno.bind(this);
    this.eliminarGuardarProfesor = this.eliminarGuardarProfesor.bind(this);
    this.guardarProfesor = this.guardarProfesor.bind(this);


    console.log("usuario que recibo en la carta")
    console.log(this.props)

    this.state = {
      usuario: this.props.usuario,
      tipo: this.props.tipo,
      guardado: false,
      idGuardado: "",
      hijoAPadre: this.props.hijoAPadre,
      procesando: 0

    }

  }

  componentDidMount() {
    this.comprobarGuardado();
  }


  //comprubas si guardado en sus profesores o alumnos
  comprobarGuardado() {
    const cookies = new Cookies();
    if (cookies.get("tipo") == "Alumno") {
      console.log("comprobacion alumno guarda al profesor")
      console.log("id del alumno: ", cookies.get("id"))

      var idProfesorBuscar;
      if (this.state.usuario.idprofesor == undefined) {
        idProfesorBuscar = this.state.usuario.id
      } else {
        idProfesorBuscar = this.state.usuario.idprofesor
      }
      console.log("id del profesor: ", idProfesorBuscar)

      TutoruvaService.comprobarProfesorGuardado(cookies.get("id"), idProfesorBuscar)
        .then(response => {

          if (response.data.length > 0) {
            this.setState({
              guardado: true,
              idGuardado: response.data[0].id

            });
            console.log("lo guarda")

          } else {
            this.setState({
              guardado: false
            });

            console.log("no lo guarda")
          }
        })
        .catch(e => {
          console.log(e);
        });







    } else {
      console.log("comprobacion profesor guarda al alumno")
      console.log("id del profesor: ", cookies.get("id"))

      var idAlumnoBuscar;
      if (this.state.usuario.idalumno == undefined) {
        idAlumnoBuscar = this.state.usuario.id
      } else {
        idAlumnoBuscar = this.state.usuario.idalumno
      }
      console.log("id del alumno: ", idAlumnoBuscar)

      TutoruvaService.comprobarAlumnoGuardado(cookies.get("id"), idAlumnoBuscar)
        .then(response => {

          if (response.data.length > 0) {
            this.setState({
              guardado: true,
              idGuardado: response.data[0].id

            });
            console.log("lo guarda")

          } else {
            this.setState({
              guardado: false
            });

            console.log("no lo guarda")
          }
        })
        .catch(e => {
          console.log(e);
        });

    }
  }



  //guardarlo
  guardarAlumno() {
    const cookies = new Cookies();
    var guardarAlumno = {
      idprofesor: cookies.get("id"),
      idalumno: this.state.usuario.id,
      nombre: this.state.usuario.nombre,
      apellidos: this.state.usuario.apellidos,
      email: this.state.usuario.email,
      grado: this.state.usuario.grado,
      fotoRuta: this.state.usuario.fotoRuta
    }

    console.log(guardarAlumno)



    TutoruvaService.guardarAlumno(guardarAlumno)
      .then(response => {

        console.log(response.data)
        this.setState({
          procesando: 1
        });
        setTimeout(() => {
          this.setState({
            procesando: 0
          });
        }, 3000)
        this.comprobarGuardado()
      })
      .catch(e => {
        console.log(e);
      });
  }


  //eliminarlo
  eliminarGuardarAlumno() {
    TutoruvaService.eliminarGuardarAlumno(this.state.idGuardado)
      .then(response => {

        console.log(response.data)
        this.setState({
          procesando: 1
        });
        setTimeout(() => {
          this.setState({
            procesando: 0
          });
        }, 3000)
        this.comprobarGuardado()
      })
      .catch(e => {
        console.log(e);
      });
  }



  //eliminarlo
  eliminarGuardarProfesor() {
    TutoruvaService.eliminarGuardarProfesor(this.state.idGuardado)
      .then(response => {

        console.log(response.data)
        this.setState({
          procesando: 1
        });
        setTimeout(() => {
          this.setState({
            procesando: 0
          });
        }, 3000)
        this.comprobarGuardado()
      })
      .catch(e => {
        console.log(e);
      });
  }





  //guardarlo
  guardarProfesor() {

    const cookies = new Cookies();
    var guardarProfesor = {
      idprofesor: this.state.usuario.id,
      idalumno: cookies.get("id"),
      nombre: this.state.usuario.nombre,
      apellidos: this.state.usuario.apellidos,
      email: this.state.usuario.email,
      despacho: this.state.usuario.despacho,
      fotoRuta: this.state.usuario.fotoRuta
    }


    console.log(guardarProfesor)

    TutoruvaService.guardarProfesor(guardarProfesor)
      .then(response => {

        console.log(response.data)
        this.comprobarGuardado()

        this.setState({
          procesando: 1
        });
        setTimeout(() => {
          this.setState({
            procesando: 0
          });
        }, 3000)



      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { usuario, tipo, guardado, procesando } = this.state;
    return (
      <div className="exterior p-3 md:w-1/3 w-full">
        <div className="interior bg-azul-uva p-3 flex flex-col justify-content items-center rounded-lg hover:bg-morado-uva hover:scale-105 ">
          <img src={usuario.fotoRuta} className="imagen-carta" />

          <p className="titulo-mediano text-blanco">{usuario.nombre} {usuario.apellidos}</p>
          <p className="titulo-mediano text-blanco">{usuario.email}</p>
          {/**campo de alumno y botones */}
          {tipo == "Alumno" ? (
            <div className="flex flex-col justify-center items-center">
              <p className="titulo-mediano text-blanco">{usuario.grado}</p>
              {!procesando ? (
                <div>

                  {guardado ? (
                    <button className="bg-rojo p-3 rounded-full text-xl text-blanco font-bold" onClick={this.eliminarGuardarAlumno}>Eliminar de mis alumnos</button>
                  ) : (
                    <button className="bg-verde p-3 rounded-full text-xl text-blanco font-bold" onClick={this.guardarAlumno}>Guardar en mis alumnos</button>
                  )}

                </div>
              ) : (
                <ScaleLoader color="#FFFFFF" />
              )

              }

            </div>

          ) : (
            <div className="flex flex-col justify-center items-center">
              {/**campo de profesor y botones */}
              <p className="titulo-mediano text-blanco">{usuario.despacho}</p>

              {!procesando ? (
                <div>

                  {guardado ? (
                    <button className="bg-rojo p-3 rounded-full text-xl text-blanco font-bold" onClick={this.eliminarGuardarProfesor}>Eliminar de mis profesores</button>
                  ) : (
                    <button className="bg-verde p-3 rounded-full text-xl text-blanco font-bold" onClick={this.guardarProfesor}>Guardar en mis profesores</button>
                  )}

                </div>
              ) : (
                <ScaleLoader color="#FFFFFF" />
              )

              }







            </div>
          )}















        </div>


      </div>
    );
  }
}


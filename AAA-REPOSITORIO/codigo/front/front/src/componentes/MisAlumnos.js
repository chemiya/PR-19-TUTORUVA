import React, { Component } from "react";
import Carta from "./Carta";
import Cookies from 'universal-cookie';
import TutoruvaService from "../services/tutoruva.service";

export default class MisAlumnos extends Component {
  constructor(props) {
    super(props);


    this.state = {
      alumnos: [],
      sinAlumnos: false
    };
  }


  //busco los guardados
  componentDidMount() {
    const cookies = new Cookies();
    this.buscarAlumnosGuadados(cookies.get("id"))
  }


  buscarAlumnosGuadados(id) {
    TutoruvaService.buscarAlumnosGuardados(id)
      .then(response => {
        this.setState({
          alumnos: response.data
        });


        if (response.data.length == 0) {
          this.setState({
            sinAlumnos: true
          });

        }
      })
      .catch(e => {
        console.log(e);
      });




  }



  render() {
    const { alumnos, sinAlumnos } = this.state;
    return (
      <div className="exterior">
        <div className="container mx-auto">
          <div className="titulo flex justify-center items-center mt-5">
            <h1 className="text-center uppercase text-4xl font-bold underline bg-azul-uva p-5 rounded-lg text-blanco shadow-2xl">Mis alumnos</h1>
          </div>



        </div>


        {/**cartas */}
        {!sinAlumnos ? (
          <div className="container mx-auto flex justify-center items-center flex-wrap mt-10">
            {alumnos.map((elemento) =>
              <Carta usuario={elemento} tipo={"Alumno"}></Carta>
            )}

          </div>
        ) : (
          <div className="container mx-auto flex justify-center items-center mt-5">
            <p className="titulo-mediano mt-3">No tienes ningún alumno</p>
          </div>
        )

        }

      </div>
    );
  }
}
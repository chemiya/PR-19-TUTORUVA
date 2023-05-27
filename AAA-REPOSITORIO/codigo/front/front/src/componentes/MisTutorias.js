import React, { Component } from "react";
import Tutoria from "./Tutoria";
import Cookies from 'universal-cookie';
import TutoruvaService from "../services/tutoruva.service";

export default class MisTutorias extends Component {

  constructor(props) {
    super(props);


    this.state = {
      tutorias: [],
      sinTutorias: false
    };
  }


  //buscar tus tutorias
  componentDidMount() {
    const cookies = new Cookies();
    if (cookies.get("tipo") == "Profesor") {
      this.buscarTutoriasProfesor(cookies.get("id"));
    } else {
      this.buscarTutoriasAlumno(cookies.get("id"));
    }
  }

  buscarTutoriasProfesor(id) {
    TutoruvaService.buscarTutoriasProfesor(id)
      .then(response => {
        this.setState({
          tutorias: response.data
        });


        if (response.data.length == 0) {
          this.setState({
            sinTutorias: true
          });
        }
      })
      .catch(e => {
        console.log(e);
      });




  }


  buscarTutoriasAlumno(id) {
    TutoruvaService.buscarTutoriasAlumno(id)
      .then(response => {
        this.setState({
          tutorias: response.data
        });


        if (response.data.length == 0) {
          this.setState({
            sinTutorias: true
          });
        }
      })
      .catch(e => {
        console.log(e);
      });




  }


  render() {
    const { tutorias, sinTutorias } = this.state;
    return (
      <div className="exterior">
        <div className="container mx-auto">
          <div className="titulo flex justify-center items-center mt-5">
            <h1 className="text-center uppercase text-4xl font-bold underline bg-azul-uva p-5 rounded-lg text-blanco shadow-2xl">Mis tutorías</h1>
          </div>



        </div>


        {/**cartas */}
        {!sinTutorias ? (
          <div className="container mx-auto flex justify-center items-center flex-wrap mt-10">
            {tutorias.map((elemento) =>
              <Tutoria tutoria={elemento}></Tutoria>
            )}

          </div>
        ) : (
          <div className="container mx-auto flex justify-center items-center mt-5">
            <p className="titulo-mediano mt-3">No tienes ninguna tutoría</p>
          </div>
        )

        }


      </div>
    );
  }
}
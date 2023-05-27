import React, { Component } from "react";
import Carta from "./Carta";
import Cookies from 'universal-cookie';
import TutoruvaService from "../services/tutoruva.service";


export default class MisProfesores extends Component {
  constructor(props) {
    super(props);


    this.state = {
      profesores: [],
      sinProfesores: false
    };
  }



  //busco los guardados
  componentDidMount() {
    const cookies = new Cookies();
    this.buscarProfesoresGuadados(cookies.get("id"))
  }


  buscarProfesoresGuadados(id) {
    TutoruvaService.buscarProfesoresGuardados(id)
      .then(response => {
        this.setState({
          profesores: response.data
        });


        if (response.data.length == 0) {
          this.setState({
            sinProfesores: true
          });

        }
      })
      .catch(e => {
        console.log(e);
      });




  }

  render() {
    const { profesores, sinProfesores } = this.state;
    return (
      <div className="exterior">
        <div className="container mx-auto">
          <div className="titulo flex justify-center items-center mt-5">
            <h1 className="text-center uppercase text-4xl font-bold underline bg-azul-uva p-5 rounded-lg text-blanco shadow-2xl">Mis profesores</h1>
          </div>



        </div>



        {/**cartas */}
        {!sinProfesores ? (
          <div className="container mx-auto flex justify-center items-center flex-wrap mt-10">
            {profesores.map((elemento) =>
              <Carta usuario={elemento} tipo={"Profesor"}></Carta>
            )}

          </div>
        ) : (
          <div className="container mx-auto flex justify-center items-center mt-5">
            <p className="titulo-mediano mt-3">No tienes ningún profesor</p>
          </div>
        )

        }

      </div>
    );
  }
}
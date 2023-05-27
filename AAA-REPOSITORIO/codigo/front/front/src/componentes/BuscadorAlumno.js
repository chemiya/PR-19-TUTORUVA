import React, { Component } from "react";
import Carta from "./Carta"
import TutoruvaService from "../services/tutoruva.service";

export default class BuscadorAlumno extends Component {


  constructor(props) {
    super(props);
    this.onChangeNombre = this.onChangeNombre.bind(this);


    this.state = {
      alumnosOriginal: [],
      alumnosFiltro: [],
      avisoVacio: false
    };
  }

  //inicio buscas todos
  componentDidMount() {

    this.buscarTodosAlumnos();
  }

  buscarTodosAlumnos() {
    TutoruvaService.buscarTodosAlumnos()
      .then(response => {
        if (response.data.length == 0) {
          this.setState({

            avisoVacio: true
          });
        }

        this.setState({
          alumnosOriginal: response.data,
          alumnosFiltro: response.data
        });
        console.log(response.data);

      })
      .catch(e => {
        console.log(e);
      });




  }


  //cuando pulse tecla
  onChangeNombre(event) {
    if (event.target.value.length == 0) {
      this.setState({

        alumnosFiltro: this.state.alumnosOriginal
      });
    } else {
      var arrayFiltro = []
      this.setState({

        alumnosFiltro: []
      });
      this.state.alumnosOriginal.forEach(element => {//filtramos
        var junto = (element.nombre + " " + element.apellidos)
        var entrada = (event.target.value)

        if (junto.includes(entrada)) {
          arrayFiltro.push(element)

        }
      });
      this.setState({

        alumnosFiltro: arrayFiltro
      });

      if (arrayFiltro.length == 0) {
        this.setState({

          avisoVacio: true
        });
      } else {
        this.setState({

          avisoVacio: false
        });
      }

    }
  }

  render() {
    const { alumnosFiltro, avisoVacio } = this.state;
    return (
      <div className="exterior">
        <div className="container mx-auto">
          <div className="titulo flex justify-center items-center mt-5">
            <h1 className="text-center uppercase text-4xl font-bold underline bg-azul-uva p-5 rounded-lg text-blanco shadow-2xl">Buscador de alumnos</h1>
          </div>



          {/**entrada */}
          <div className="entrada-nombre mt-10 w-full flex justify-center items-center ">
            <input onChange={this.onChangeNombre} type="text" id="nombre" placeholder="Nombre del alumno" class="w-3/4 border   text-sm rounded-lg block w-full p-2.5 " />
          </div>
        </div>



        {/**cartas */}
        {!avisoVacio ? (
          <div className="container mx-auto flex justify-center items-center flex-wrap">
            {alumnosFiltro.map((elemento) =>
              <Carta usuario={elemento} tipo={"Alumno"}></Carta>
            )}

          </div>
        ) : (
          <div className="container mx-auto flex justify-center items-center flex-wrap mt-2">
            <p className="titulo-mediano">No se ha encontrado ningún alumno </p>

          </div>
        )}


      </div>
    );
  }
}
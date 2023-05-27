import React, { Component } from "react";
import Carta from "./Carta"
import TutoruvaService from "../services/tutoruva.service";

export default class BuscadorProfesor extends Component {



  constructor(props) {
    super(props);
    this.onChangeNombre = this.onChangeNombre.bind(this);
   


    this.state = {
      profesoresOriginal: [],
      profesoresFiltro: [],
      avisoVacio: false
    };
  }


  //al inicio cargas todos
  componentDidMount() {

    this.buscarTodosProfesores();
  }


  //cargas todos
  buscarTodosProfesores() {
    TutoruvaService.buscarTodosProfesores()
      .then(response => {

        if (response.data.length == 0) {
          this.setState({

            avisoVacio: true
          });
        }

        this.setState({
          profesoresOriginal: response.data,
          profesoresFiltro: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });




  }



  //cuando pulsa tecla
  onChangeNombre(event) {
    if (event.target.value.length == 0) {//ninguna
      this.setState({

        profesoresFiltro: this.state.profesoresOriginal
      });
    } else {
      var arrayFiltro = []
      this.setState({

        profesoresFiltro: []
      });
      this.state.profesoresOriginal.forEach(element => {//filtra
        var junto = (element.nombre + " " + element.apellidos)
        var entrada = (event.target.value)

        if (junto.includes(entrada)) {
          arrayFiltro.push(element)

        }
      });
      this.setState({

        profesoresFiltro: arrayFiltro
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
    const { profesoresFiltro, avisoVacio } = this.state;
    return (
      <div className="exterior">
        <div className="container mx-auto">
          <div className="titulo flex justify-center items-center mt-5">
            <h1 className="text-center uppercase text-4xl font-bold underline bg-azul-uva p-5 rounded-lg text-blanco shadow-2xl">Buscador de profesores</h1>
          </div>



          {/**input */}
          <div className="entrada-nombre mt-10 w-full flex justify-center items-center ">
            <input onChange={this.onChangeNombre} type="text" id="nombre" placeholder="Nombre del profesor" class="w-3/4 border   text-sm rounded-lg block w-full p-2.5 " />
          </div>
        </div>



        {/**cartas */}
        {!avisoVacio ? (
          <div className="container mx-auto flex justify-center items-center flex-wrap">
            {profesoresFiltro.map((elemento) =>
              <Carta usuario={elemento} tipo={"Profesor"} ></Carta>
            )}

          </div>
        ) : (
          <div className="container mx-auto flex justify-center items-center flex-wrap mt-2">
            <p className="titulo-mediano">No se ha encontrado ningún profesor</p>

          </div>
        )}

      </div>
    );
  }
}
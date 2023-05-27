import React, { Component } from "react";
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withRouter } from '../common/with-router';


class Tutoria extends Component {
    constructor(props) {
        super(props);
        this.clickTutoria = this.clickTutoria.bind(this);


        this.state = {
            tutoria: this.props.tutoria
        }

    }

    //click para abrirla
    clickTutoria() {
        this.props.router.navigate('/detallesTutoria/' + this.props.tutoria.id);
    }


    render() {
        const { tutoria } = this.state;
        return (
            <div className="exterior p-3 md:w-1/3 w-full " onClick={this.clickTutoria}>
                <div className="interior bg-azul-uva p-3 flex flex-col justify-content items-start rounded-lg cursor-pointer hover:bg-morado-uva hover:scale-105">


                    {/**fila */}
                    <div className="fila flex justify-center items-center">
                        <FontAwesomeIcon icon={faCalendarDays} className="text-4xl text-blanco mb-3 me-3" />
                        <p className="ms-4 titulo-mediano text-blanco">{tutoria.fecha}</p>
                    </div>


                    {/**fila */}
                    <div className="fila flex justify-center items-center">
                        <FontAwesomeIcon icon={faClock} className="text-4xl text-blanco mb-3 me-3" />
                        <p className="ms-4 titulo-mediano text-blanco">{tutoria.horainicio}-{tutoria.horafin}</p>
                    </div>


                    {/**fila */}
                    <div className="fila flex justify-center items-center">
                        <FontAwesomeIcon icon={faComments} className="text-4xl text-blanco mb-3 me-3" />
                        <p className=" ms-2 text-blanco font-bold text-2xl">{tutoria.estadotutoria}</p>
                    </div>


                </div>


            </div>
        );
    }
}

export default withRouter(Tutoria);
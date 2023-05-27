import React, { Component } from "react";
import DialogoRegistro from "./DialogoRegistro"
import DialogoIdentificacion from "./DialogoIdentificacion"
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import FotoPrueba from "./../imagenes/escudo.jpg"
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default class PantallaPrincipal extends Component {


  render() {
    return (
      <div className="exterior">

        <Disclosure as="nav" className="bg-azul-uva p-3 ">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6 text-blanco" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6 text-blanco" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className=" flex flex-1 items-center justify-center sm:items-stretch sm:justify-end ">

                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">

                        <DialogoIdentificacion />
                        <DialogoRegistro />





                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">

                <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col justify-start items-start">
                  <DialogoIdentificacion />
                  <DialogoRegistro />
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>









        <section class="principal">
          <div className="container mx-auto flex justify-center items-center">
            <div className="cuadro-blanco bg-blanco flex flex-col md:flex-row justify-center items-center w-3/4 rounded-lg">
              <div className="texto   p-3 w-full  md:w-1/2 flex justify-center items-center">
                <p className="text-4xl font-bold md:text-end text-center">TutorUVa, la aplicación para gestionar las
                  tutorías en la Universidad de Valladolid</p>
              </div>
              <div className="imagen w-full md:w-1/2   flex justify-center items-center p-3">
                <img src={FotoPrueba}></img>
              </div>


            </div>
          </div>
        </section>







        <section className="cartas mt-24">
          <div className="flex justify-center items-center">
            <div className="interior-titulo p-3 md:w-1/2 w-full ">
              <p className="titulo-grande">TutorUVa facilita la comunicación para acordar tutorías entre alumnos y profesores</p>
            </div>
          </div>


          <div className="container mx-auto flex md:flex-row flex-col">
            <div className="carta p-3 md:w-1/3 w-full">
              <div className="interior bg-azul-uva p-5 flex flex-col justify-center items-center rounded-lg">
                <FontAwesomeIcon icon={faCirclePlus} className="text-6xl text-blanco mb-3" />
                <p className="text-2xl font-bold text-center text-blanco">Crea tutorías definiendo el horario y el tema</p>

              </div>

            </div>

            <div className="carta p-3 md:w-1/3 w-full">
              <div className="interior bg-azul-uva p-5 flex flex-col justify-center items-center rounded-lg">
                <FontAwesomeIcon icon={faPenToSquare} className="text-6xl text-blanco mb-3" />
                <p className="text-2xl font-bold text-center text-blanco">Edita la tutoría para ajustarla a un horario</p>

              </div>

            </div>

            <div className="carta p-3 md:w-1/3 w-full">
              <div className="interior bg-azul-uva p-5 flex flex-col justify-center items-center rounded-lg">
                <FontAwesomeIcon icon={faFloppyDisk} className="text-6xl text-blanco mb-3" />
                <p className="text-2xl font-bold text-center text-blanco">Guarda tus alumnos o profesores</p>

              </div>

            </div>

          </div>
        </section>







        <section className="cartas-largas mt-24">
          <p className="titulo-grande">Prueba ya TutorUVa y descubre que ventajas tiene</p>
          <div className="container mx-auto flex flex-col mt-8">
            <div className="carta p-3">
              <div className="interior-carta bg-azul-uva rounded-lg p-3 flex md:flex-row flex-col justify-center items-center">
                <div className="icono md:w-1/3 w-full flex justify-center items-center">
                  <FontAwesomeIcon icon={faPlayCircle} className="text-9xl text-blanco mb-3" />
                </div>

                <div className="texto">
                  <p className="text-blanco p-3 text-3xl font-bold md:text-start text-center">TutorUVa hace que la gestión para acordar una tutoría sea más rápida y eficiente</p>
                </div>


              </div>
            </div>

            <div className="carta p-3 mt-10">
              <div className="interior-carta bg-azul-uva rounded-lg md:flex-row flex-col p-3 flex justify-center items-center">

                <div className="texto">
                  <p className="text-blanco p-3 text-3xl font-bold md:text-start text-center">TutorUVa hace que la tutoría quede claramente acordada para profesor y alumno</p>
                </div>
                <div className="icono  md:w-1/3 w-full flex justify-center items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-9xl text-blanco mb-3" />
                </div>
              </div>
            </div>
          </div>
        </section>






        <section className="bg-azul-uva p-10 mt-10">
          <div className="container mx-auto">
            <p className="text-center font-bold text-2xl text-blanco">Jose María Lozano Olmedo</p>
            <p className="text-center font-bold text-2xl text-blanco">All Rights Reserved &copy;</p>

          </div>
        </section>


















      </div>
    );
  }
}
import React, { useEffect, useRef, useState } from "react";

const Menu = () => {
   const [viewMenu, setViewMenu] = useState(false);
   const refContent = useRef();

   useEffect(() => {
      if (viewMenu) {
         refContent.current.style = " width: 100vw";
      } else {
         refContent.current.style = " width: 0";
      }
   }, [viewMenu]);

   const isTouch = ({ target }) => {
      if (target.localName === "div" || target.localName === "i") {
         setViewMenu(!viewMenu);
      }
   };
   return (
      <>
         <div className="menu">
            <a href="/"> Inicio</a>
            <a href="/iniciarsesion">Iniciar Sesion</a>
            <a href="/registrarpaciente">Registrar Paciente</a>
            <a href="/registrarmedico">Registrar Medico</a>
            <a href="#"> Contactanos</a>
         </div>
         <div className="menuMovil" onClick={isTouch}>
            <i className="ri-menu-line"></i>
         </div>

         <div ref={refContent} className="contentMenu">
            <div className="menuMostrarMovil">
               <a href="/"> Inicio</a>
               <a href="/iniciarsesion">Iniciar Sesion</a>
               <a href="/registrarpaciente">Registrar Paciente</a>
               <a href="/registrarmedico">Registrar Medico</a>
               <a href="#"> Contactanos</a>
               <button className="btnMovilClose" onClick={isTouch}>
                  <i className="ri-close-line"></i>
               </button>
            </div>
         </div>
      </>
   );
};

export default Menu;

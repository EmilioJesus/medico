import React, { useEffect, useRef, useState } from "react";

const MenuLoggedUser = ({ cerrar_sesion }) => {
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
            <a href="/principal">Principal</a>
            <a href="/perfil_paciente">Mi perfil</a>
            <a href="/citaspaciente">Citas</a>
            <a href="#" onClick={cerrar_sesion}>
               Cerrar Sesion
            </a>
         </div>
         <div className="menuMovil" onClick={isTouch}>
            <i className="ri-menu-line"></i>
         </div>

         <div ref={refContent} className="contentMenu">
            <div className="menuMostrarMovil">
               <a href="/Home">Principal</a>
               <a href="/perfil_paciente">Mi perfil</a>
               <a href="/citaspaciente">Citas</a>
               <a href="#" onClick={cerrar_sesion}>
                  Cerrar Sesion
               </a>
               <button className="btnMovilClose" onClick={isTouch}>
                  <i className="ri-close-line"></i>
               </button>
            </div>
         </div>
      </>
   );
};

export default MenuLoggedUser;

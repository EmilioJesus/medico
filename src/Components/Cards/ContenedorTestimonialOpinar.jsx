import React, { useState } from "react";
import CardTestimonial from "./CardTestimonial";

const ContenedorTestimonialOpinar = ({ opinar }) => {
   const [viewForm, setViewForm] = useState(false);

   return (
      <section className="contenedor">
         <h1 className="titulo">
            ¿Qué opinan <br /> de nosotros? <i className="fa fa-users"></i>
         </h1>
         <section className="contenedorCardTest">
            <CardTestimonial />
            <CardTestimonial />
            <CardTestimonial />
            <CardTestimonial />
         </section>
         {viewForm && (
            <div className="animate__animated animate__fadeInDown  animate__faster contenedor contentBlanco">
               <label className="label">
                  ¿Que opinas de nuestro servicio?
                  <br />
                  <textarea className="textArea" id="opinar"></textarea>
               </label>
               <br />
               <button className="btn-principal" onClick={opinar}>
                  Enviar
               </button>
            </div>
         )}

         <button
            className="btn-principal seconbtn"
            onClick={() => setViewForm(!viewForm)}
         >
            Opinar
         </button>
      </section>
   );
};

export default ContenedorTestimonialOpinar;

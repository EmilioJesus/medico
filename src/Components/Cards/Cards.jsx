import React from "react";

const CardIu = ({ imagen, titulo, descripcion }) => {
   return (
      <>
         <article className="card">
            <h2>{titulo}</h2>
            <hr />
            <div className="img">
               <img src={imagen} alt="imagen de servicio" />
            </div>
            <p>{descripcion}</p>
         </article>
      </>
   );
};

export default CardIu;

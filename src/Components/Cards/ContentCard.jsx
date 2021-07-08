import React from "react";
import Cards from "./Cards";
const img = require.context("../../imagenes", true);
const ContenedorCard = () => {
   return (
      <main className="contenedor">
         <section className="grid col-fluida">
            <Cards
               imagen={img("./presentacion.svg").default}
               titulo="Sistema facil de usar"
               descripcion="Lorem ipsum dolor sit amet,
            consectetur adipiscing"
            />
            <Cards
               imagen={img("./verificado.svg").default}
               titulo="Datos seguros"
               descripcion="Lorem ipsum dolor sit amet,
                   consectetur adipiscing"
            />

            <Cards
               imagen={img("./gratis.svg").default}
               titulo="Registro sin costo"
               descripcion="Lorem ipsum dolor sit amet,
                   consectetur adipiscing"
            />

            <Cards
               imagen={img("./medico.svg").default}
               titulo="Doctores especializados"
               descripcion="Lorem ipsum dolor sit amet,
                   consectetur adipiscing"
            />
         </section>
      </main>
   );
};

export default ContenedorCard;

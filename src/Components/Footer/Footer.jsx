import React from "react";

const img = require.context("./../../imagenes", true);

const Footer = () => {
   return (
      <footer className="footer contenedor contentBlanco">
         <section>
            <ul>
               <li className="li">
                  <article>
                     Redes Sociales
                     <article className="redesSociales">
                        <img src={img("./instagram.svg").default} alt="" />

                        <img src={img("./facebook.svg").default} alt="" />
                     </article>
                  </article>
               </li>
               <li className="li">¿Quienes Somos?</li>
               <li className="li">Preguntas Frecuentes</li>
               <li className="li">Contactanos</li>
               <li className="li">Admin</li>
            </ul>
         </section>
      </footer>
   );
};

export default Footer;

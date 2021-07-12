import React, { Component } from "react";
import db from "./firebase_config";
import firebase from "firebase/app";
import "firebase/auth";
import logo from "./imagenes/perfil_predeterminada.jpg";
import Menu from "./Components/Menu/Menu";
const img = require.context("./imagenes", true);

class regis_medico extends Component {
   //funcion para registrar al medico

   regis_medi() {
      //recuperacion de los datos de la caja de texto
      const nombre = document.getElementById("nombreMedi").value;
      const apellidoPaterno = document.getElementById("apellidoPaternoMedi").value;
      const apellidoMaterno = document.getElementById("apellidoMaternoMedi").value;
      const especialidad = document.getElementById("selectespecialidad").value;
      const cedula = document.getElementById("cedulaProMedi").value;
      const telefono = document.getElementById("telefonoMedi").value;
      const pais = document.getElementById("paisMedi").value;
      const estado = document.getElementById("selectestado").value;
      const fecha = document.getElementById("fechaNaciMedi").value;
      const correo = document.getElementById("correoElecMedi").value;
      const correo1 = document.getElementById("correoElecunoMedi").value;
      const contra = document.getElementById("contraselaUnoMedi").value;
      const contra1 = document.getElementById("contraselaDosMedi").value;
      const describir = document.getElementById("describeTrabajoMedi").value;
      const checar = document.getElementById("checarMedi").checked;
      var hoy = new Date();
      var fechainscripcion =
         hoy.getUTCFullYear() +
         "-" +
         (hoy.getMonth() + 1) +
         "-" +
         hoy.getDate();
      alert(fechainscripcion);
      var terminoinscripcion =
         hoy.getUTCFullYear() +
         "-" +
         (hoy.getMonth() + 1 + 3) +
         "-" +
         hoy.getDate();
      alert(terminoinscripcion);

      //checar si las cajas de texto no estan vacias
      if (
         nombre !== "" &&
         apellidoPaterno !== "" &&
         apellidoMaterno !== "" &&
         telefono !== "" &&
         pais !== "" &&
         estado !== "" &&
         correo !== "" &&
         contra !== "" &&
         contra1 !== "" &&
         correo1 !== "" &&
         cedula !== "" &&
         especialidad !== ""
      ) {
         alert("ninguno de los campos esta vacio");
         //checar si las contraseñas son iguales
         if (contra == contra1) {
            //checar si se aceptaron los terminos y condiciones
            if (checar == true) {
               alert("contraseñas iguales");
               //registra al usuario en la consola de firebase
               firebase
                  .auth()
                  .createUserWithEmailAndPassword(correo, contra)
                  .then(function () {
                     alert("Usuario registrado");
                     //observador para poder ingresar los datos a firestore de firebase
                     firebase.auth().onAuthStateChanged((user) => {
                        var uid = user.uid;
                        db.collection("Usuarios")
                           .doc(uid)
                           .set({
                              Nombre: nombre,
                              ApellidoPaterno: apellidoPaterno,
                              ApellidoMaterno: apellidoMaterno,
                              Especialidad: especialidad,
                              Cedula: cedula,
                              Telefono: telefono,
                              Pais: pais,
                              Estado: estado,
                              Fecha: fecha,
                              Email: correo,
                              Contrasena: contra,
                              Descripcion: describir,
                              TipoUsuario: "Doctor",
                              Fechainscripcion: fechainscripcion,
                              Terminoinscripcion: terminoinscripcion,
                              ImagenPerfil: logo,
                              Costoconsulta: "",
                           })
                           .then((docRef) => {
                              alert("datos agregados a la base de datos");
                              alert(
                                 "Usuario registrado tienes 3 meses gratis de inscripcion"
                              );
                              var user = firebase.auth().currentUser;
                              user
                                 .sendEmailVerification()
                                 .then(function () {
                                    // Email sent.
                                    window.location.href = "/";
                                 })
                                 .catch(function (error) {
                                    // An error happened.
                                 });
                           })
                           .catch((error) => {
                              console.error("Error adding document: ", error);
                              alert(error);
                           });
                     });
                  })
                  .catch(function (error) {
                     var errorCode = error.code;
                     var errorMessage = error.message;
                     alert(errorMessage);
                     alert(errorCode);
                     // ..
                  });
            } else {
               alert("no se aceptaron los terminos y condiciones");
            }
         } else {
            alert("contraseñas diferentes");
         }
      } else {
         alert("los campos estan vacios");
      }
   }

   componentDidMount() {
      this.estado();
      this.especialidad();
   }

   especialidad() {
      const select = document.getElementById("selectespecialidad");
      var especialidad = [];
      db.collection("Administrador")
         .doc("Especialidades")
         .collection("Especialidad1")
         .get()
         .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
               console.log(`${doc.id} => ${doc.data().Estado}`);
               especialidad.push(doc.data().Especialidad);
            });
            for (var x = 0; x <= especialidad.length; x++) {
               select.options[x] = new Option(especialidad[x]);
            }
         });
   }

   estado() {
      const select = document.getElementById("selectestado");
      var estado = [];
      db.collection("Administrador")
         .doc("Estado")
         .collection("Estado1")
         .get()
         .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
               console.log(`${doc.id} => ${doc.data().Estado}`);
               estado.push(doc.data().Estado);
            });
            for (var x = 0; x <= estado.length; x++) {
               select.options[x] = new Option(estado[x]);
            }
         });
   }

   //htnl para que se muestre la pagina
   render() {
      return (
         <div>
            <Menu />
            <div
               className="formIniciar contenedor contentBlanco"
               onLoad={(this.especialidad, this.estado)}
            >
               <img
                  src={img("./consultante.svg").default}
                  alt="Imagen Consulta"
               />
               <h1 className="tituloMenu">Bienvenido</h1>
               <h2 className="subtituloMenu">
                  Necesitamos más información sobre ti antes de empezar
               </h2>

               <br />
               <br />

               <form>
                  <label>
                     Nombre:
                     <br />
                     <input className="input" type="text" id="nombreMedi" />
                  </label>
                  <br />
                  <br />
                  <label>
                     Apellido Paterno:
                     <br />
                     <input
                        className="input"
                        type="text"
                        id="apellidoPaternoMedi"
                     />
                  </label>
                  <br />
                  <br />
                  <label>
                     Apellido Materno:
                     <br />
                     <input
                        className="input"
                        type="text"
                        id="apellidoMaternoMedi"
                     />
                  </label>
                  <br />
                  <br />
                  <label>
                     Especialidad:
                     <br />
                     <select className="input" id="selectespecialidad"></select>
                  </label>
                  <br />
                  <br />
                  <label>
                     Cedula Profecional:
                     <br />
                     <input className="input" type="text" id="cedulaProMedi" />
                  </label>
                  <br />
                  <br />
                  <label>
                     Telefono:
                     <br />
                     <input className="input" type="number" id="telefonoMedi" />
                  </label>
                  <br />
                  <br />
                  <label>
                     Pais:
                     <br />
                     <input className="input" type="text" id="paisMedi" />
                  </label>
                  <br />
                  <br />
                  <label>
                     Estado:
                     <br />
                     <select className="input" id="selectestado"></select>
                  </label>
                  <br />
                  <br />
                  <label>
                     Fecha Nacimiento:
                     <br />
                     <input className="input" type="date" id="fechaNaciMedi" />
                  </label>
                  <br />
                  <br />
                  <label>
                     Correo Electronico:
                     <br />
                     <input
                        className="input"
                        type="email"
                        id="correoElecMedi"
                        required
                     />
                  </label>
                  <br />
                  <br />
                  <label>
                     Confirmar Correo Electronico:
                     <br />
                     <input
                        className="input"
                        type="email"
                        id="correoElecunoMedi"
                        required
                     />
                  </label>
                  <br />
                  <br />
                  <label>
                     Contraseña:
                     <br />
                     <input
                        className="input"
                        type="password"
                        id="contraselaUnoMedi"
                        required
                     />
                  </label>
                  <br />
                  <br />
                  <label>
                     Confirmar Contraseña:
                     <br />
                     <input
                        className="input"
                        type="password"
                        id="contraselaDosMedi"
                        required
                     />
                  </label>
                  <br />
                  <br />
                  <label>
                     Describe tu trabajo:
                     <br />
                     <textarea
                        className="textArea"
                        id="describeTrabajoMedi"
                     ></textarea>
                  </label>
                  <br />
                  <br />
                  <label>
                     Acepto terminos y condiciones
                     <input type="radio" id="checarMedi" name="aceptar" />
                  </label>

                  <br />
                  <br />
                  <input
                     className="btn-principal seconbtn"
                     type="button"
                     id="enviar"
                     onClick={this.regis_medi}
                     value="Registrar"
                  />
               </form>
            </div>
         </div>
      );
   }
}
export default regis_medico;

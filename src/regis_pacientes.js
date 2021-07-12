import React, { Component } from "react";
import db from "./firebase_config";
import firebase from "firebase/app";
import "firebase/auth";
import logo from "./imagenes/perfil_predeterminada.jpg";
import Menu from "./Components/Menu/Menu";
const img = require.context("./imagenes", true);
class regis_pacientes extends Component {
   //funcion para registrar al paciente
   regis_usu() {
      //recuperacion de los datos de la caja de texto
      const correo = document.getElementById("correoElec").value;
      const contra = document.getElementById("contraselaUno").value;
      const contra1 = document.getElementById("contraselaDos").value;
      const fecha = document.getElementById("fechanacimiento").value;
      //checar si las cajas de texto no estan vacias
      if (correo !== "" && contra !== "" && contra1 !== "") {
         alert("ninguno de los campos esta vacio");
         //checar si las contraseñas son iguales
         if (contra == contra1) {
            //checar si se aceptaron los terminos y condiciones
            alert("contraseñas iguales");
            //registra al usuario en la consola de firebase
            firebase
               .auth()
               .createUserWithEmailAndPassword(correo, contra)
               .then((userCredential) => {
                  alert("Usuario registrado");
                  //observador para poder ingresar los datos a firestore de firebase
                  firebase.auth().onAuthStateChanged((user) => {
                     var uid = user.uid;
                     db.collection("Usuarios")
                        .doc(uid)
                        .set({
                           Nombre: "",
                           ApellidoPaterno: "",
                           ApellidoMaterno: "",
                           Telefono: "",
                           Pais: "",
                           Estado: "",
                           Fecha: fecha,
                           Email: correo,
                           TipoUsuario: "Paciente",
                           ImagenPerfil: logo,
                           Peso: "",
                           Altura: "",
                           Imc: "",
                        })
                        .then((docRef) => {
                           alert("datos agregados a la base de datos");
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
            alert("contraseñas diferentes");
         }
      } else {
         alert("los campos estan vacios");
      }
   }

   //funcion para registrarse con google la funcion te la da firebase tal como esta
   regis_google() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
         .auth()
         .signInWithPopup(provider)
         .then((result) => {
            firebase.auth().onAuthStateChanged((user) => {
               var uid = user.uid;
               var correo = result.user.email;
               var nombre = result.user.displayName;
               db.collection("Pacientes")
                  .doc(uid)
                  .set({
                     Email: correo,
                     Nombre: nombre,
                     TipoUsuario: "Paciente",
                  })
                  .then((docRef) => {
                     //console.log("Document written with ID: ", docRef.id);
                     window.location.href = "/perfil_paciente";
                  })
                  .catch((error) => {
                     console.error("Error adding document: ", error);
                  });
            });

            // ...
         })
         .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
         });
   }

   //htnl para que se muestre la pagina
   render() {
      return (
         <div>
            <Menu />
            <div className="formIniciar contenedor contentBlanco">
               <img src={img("./consulta.svg").default} alt="" />
               <h1 className="tituloMenu">¿Nuevo por aquí?</h1>
               <h2 className="subtituloMenu">Estamos ansiosos por atenderte</h2>

               <div className="contentLogBtn">
                  <div className="btnLog" onClick={this.regis_google}>
                     <img src={img("./google.svg").default} alt="Logo Google" />
                     Google
                  </div>
                  <div className="btnLog" onClick={this.regis_face}>
                     <img src={img("./facebook.svg").default} alt="Logo Face" />
                     Facebook
                  </div>
               </div>
               <br />
               <label>
                  Correo Electronico: <br />
                  <input
                     required
                     className="input"
                     type="email"
                     id="correoElec"
                     required
                  />
               </label>

               <br />
               <label>
                  Contraseña:
                  <br />
                  <input
                     required
                     type="password"
                     id="contraselaUno"
                     className="input"
                     required
                  />
               </label>
               <br />
               <label>
                  Confirmar Contraseña:
                  <br />
                  <input
                     type="password"
                     id="contraselaDos"
                     className="input"
                     required
                  />
               </label>
               <br />
               <label>
                  Fecha de Nacimiemto:
                  <br />
                  <input
                     type="date"
                     id="fechanacimiento"
                     className="input"
                     required
                  />
               </label>
               <br />
               <input
                  className="btn-principal seconbtn"
                  type="button"
                  id="enviar"
                  onClick={this.regis_usu}
                  value="Registrar"
               />
            </div>
         </div>
      );
   }
}

export default regis_pacientes;

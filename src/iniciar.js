
import React, { Component } from 'react';
import db from './firebase_config'
import firebase from 'firebase/app';
import "firebase/auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class iniciar extends Component {

  //funcion para iniciar sesion 
  iniciar() {
    //se recupera el valor de la caja de textos
    const correo = document.getElementById('correoElec').value;
    const password = document.getElementById('pasword').value;
    //verificar que las cajas no esten vacias
    if (correo !== "" && password != "") {
      //funcion de firebase para poder iniciar sesion 
      firebase.auth().signInWithEmailAndPassword(correo, password)
        .then((userCredential) => {
          //escuchador para revisar si el correo ya esta verificado
          firebase.auth().onAuthStateChanged((user) => {
            var uid = user.uid;
            var emailVerified = user.emailVerified;
            //comprobacion del correo verificado
            if (emailVerified == true) {
              //te redirecciona al perfil
              var docRef = db.collection("Usuarios").doc(uid);
              docRef.get().then((doc) => {
                if (doc.exists) {
                  console.log("Document data:", doc.data().TipoUsuario);
                  const tipo = doc.data().TipoUsuario;
                  if (tipo == "Paciente") {
                    alert("Inicio un paciente");
                    window.location.href = "/principal";

                  } else if (tipo == "Doctor") {
                    alert("Inicio un doctor");
                    window.location.href = "/principaldoctor";

                  }
                } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
                }
              }).catch((error) => {
                console.log("Error getting document:", error);
              });


            } else {
              alert("El email del usuario no esta verificado");

            }
          });


        })
        .catch((error) => {
          alert("Usuario o contraseña incorrecta");
          var errorCode = error.code;
          var errorMessage = error.message;
        });

    } else {
      alert("los campos no deben de estar vacios");
    }
  }

  //funcion para registrarse con google la funcion te la da firebase tal como esta 
  regis_google() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        firebase.auth().onAuthStateChanged((user) => {
          var uid = user.uid;
          var correo = result.user.email;
          var nombre = result.user.displayName;
          db.collection("Pacientes").doc(uid).set({
            Email: correo,
            Nombre: nombre,
            TipoUsuario: "Paciente"
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
      }).catch((error) => {
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

  regis_face() {

    alert("correcto");

  }



  //html que se muestra en la pagina   
  render() {
    return (
      <div className="App">
        <form>
          <label for="email" aria-valuetext="correo">Correo Electronico:</label><br />
          <input type="email" id="correoElec" class="form-control" /><br />
          <label for="pwd">Contraseña:</label><br />
          <input type="password" id="pasword" class="form-control"></input><br />
          <a href="/">Principal</a><br/>
          <a href="/registrarpaciente">Registrar Paciente</a><br/>
          <a href="/registrarmedico">Registrar Medico</a><br/>
          <input type="button" id="enviar" onClick={this.regis_google} value="Iniciar con Google"></input><br />
          <input type="button" id="enviar" onClick={this.regis_face} value="Iniciar con Facebook"></input><br />
          <a href="/contrasena">Has olvidado tu Contraseña</a><br/>
          <input type="button" id="enviar" onClick={this.iniciar} value="Entrar" />
        </form>
      </div>
    );
  }
}

export default iniciar;


import React, { Component } from 'react';
import db from './firebase_config'
import firebase from 'firebase/app';
import "firebase/auth";
import logo from './imagenes/perfil_predeterminada.jpg'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";





class regis_pacientes extends Component {

  //funcion para registrar al paciente
  regis_usu() {
    //recuperacion de los datos de la caja de texto 
    const correo = document.getElementById('correoElec').value;
    alert(correo);
    const contra = document.getElementById('contraselaUno').value;
    alert(contra);
    const contra1 = document.getElementById('contraselaDos').value;
    alert(contra);
    //checar si las cajas de texto no estan vacias
    if (correo !== "" && contra !== "" && contra1 !== "") {
      alert("ninguno de los campos esta vacio");
      //checar si las contraseñas son iguales 
      if (contra == contra1) {
        //checar si se aceptaron los terminos y condiciones
        alert("contraseñas iguales");
        //registra al usuario en la consola de firebase
        firebase.auth().createUserWithEmailAndPassword(correo, contra)
          .then((userCredential) => {
            alert("Usuario registrado");
            //observador para poder ingresar los datos a firestore de firebase
            firebase.auth().onAuthStateChanged((user) => {
              var uid = user.uid;
              db.collection("Usuarios").doc(uid).set({
                Nombre: "",
                ApellidoPaterno: "",
                ApellidoMaterno: "",
                Telefono: "",
                Pais: "",
                Estado: "",
                Fecha: "",
                Email: correo,
                TipoUsuario: "Paciente",
                ImagenPerfil:logo,
                Peso:"",
                Altura:"",
                Imc:""
              })
                .then((docRef) => {
                  alert("datos agregados a la base de datos");
                  var user = firebase.auth().currentUser;
                  user.sendEmailVerification().then(function () {
                    // Email sent.
                    window.location.href = "/";
                  }).catch(function (error) {
                    // An error happened.
                  });
                })
                .catch((error) => {
                  console.error("Error adding document: ", error);
                  alert(error);
                });
            });
          }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            alert(errorCode);
            // ..
          })
      } else {
        alert("contraseñas diferentes");
      }

    } else {
      alert("los campos estan vacios");
    }

  }




  //htnl para que se muestre la pagina
  render() {
    return (
      <body>
        <div className="">
          <a href="/">Principal</a><br/>
          <a href="/iniciarsesion">Iniciar Sesion</a><br/>
          <a href="/registrarmedico">Registrar Medico</a>
          <h1>Registrarte como paciente</h1>
          <label  >Correo Electronico:</label><br />
          <input type="email" id="correoElec" required /><br />
          <label for="pwd">Contraseña:</label><br />
          <input type="password" id="contraselaUno" class="form-control" required></input><br />
          <label for="pwd">Confirmar Contraseña:</label><br />
          <input type="password" id="contraselaDos" class="form-control" required></input><br />
          <input type="button" id="enviar" onClick={this.regis_usu} value="Registrar"></input>
        </div>
      </body>
    );
  }
}

export default regis_pacientes;

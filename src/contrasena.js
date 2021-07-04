
import React, {Component} from 'react';
import db from './firebase_config'
import firebase from  'firebase/app';
import "firebase/auth";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


class contrasena extends Component
{

    //funcion para recuperar la contraseña
    recuperar()
    {
        //ontener el valor de la caja de texto
        var email = document.getElementById("correoElec").value;
        //verificar que la caja de texto no este vacia
        if(email !="")
        {
          //funcion de firebase para restablecer contraseña
        firebase.auth().sendPasswordResetEmail(email).then(function () {
          // Email sent.
          alert("Se envio un correo para restablecer tu contraseña");
          window.location.href = "/";
        }).catch(function (error) {
          // An error happened.
        }); 
        }else
        {
            alert("Los campos no debe de estar vacio");
        }
        
    }
    
//html que se visualiza en la pagina
render () {
  return (
    <div className="App">
        <h1>Restablecer Contraseña</h1>
      <form>
      <label for="email" aria-valuetext="correo">Correo Electronico:</label><br/>
      <input type="email" id="correoElec" class="form-control"/><br/>
    <input type="button" id="enviar" onClick={this.recuperar} value="Restablecer Contraseña"/> 
      </form>
    </div>
  );
}
}

export default contrasena;

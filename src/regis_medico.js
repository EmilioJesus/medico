import React, { Component } from 'react';
import db from './firebase_config'
import firebase from 'firebase/app';
import "firebase/auth";
import logo from './imagenes/perfil_predeterminada.jpg'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  For
} from "react-router-dom";



class regis_medico extends Component {

  //funcion para registrar al medico

  regis_medi() {

    //recuperacion de los datos de la caja de texto 
    const nombre = document.getElementById('nombreMedi').value;
    alert(nombre);
    const apellidoPaterno = document.getElementById('apellidoPaternoMedi').value;
    alert(apellidoPaterno);
    const apellidoMaterno = document.getElementById('apellidoMaternoMedi').value;
    alert(apellidoMaterno);
    const especialidad = document.getElementById('selectespecialidad').value;
    alert(especialidad);
    const cedula = document.getElementById('cedulaProMedi').value;
    alert(cedula);
    const telefono = document.getElementById('telefonoMedi').value;
    alert(telefono);
    const pais = document.getElementById('paisMedi').value;
    alert(pais);
    const estado = document.getElementById('selectestado').value;
    alert(estado);
    const fecha = document.getElementById('fechaNaciMedi').value;
    alert(fecha);
    const correo = document.getElementById('correoElecMedi').value;
    alert(correo);
    const correo1 = document.getElementById('correoElecunoMedi').value;
    alert(correo1);
    const contra = document.getElementById('contraselaUnoMedi').value;
    alert(contra);
    const contra1 = document.getElementById('contraselaDosMedi').value;
    alert(contra);
    const describir = document.getElementById('describeTrabajoMedi').value;
    alert(describir);
    const checar = document.getElementById('checarMedi').checked;
    alert(checar);
    var hoy = new Date();
    var fechainscripcion = hoy.getUTCFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
    alert(fechainscripcion);
    var terminoinscripcion = hoy.getUTCFullYear() + '-' + (hoy.getMonth() + 1 + 3) + '-' + hoy.getDate();
    alert(terminoinscripcion);

    //checar si las cajas de texto no estan vacias
    if (nombre !== "" && apellidoPaterno !== "" && apellidoMaterno !== "" && telefono !== "" && pais !== "" && estado !== "" && correo !== "" && contra !== "" && contra1 !== "" && correo1 !== "" && cedula !== "" && especialidad !== "") {
      alert("ninguno de los campos esta vacio");
      //checar si las contraseñas son iguales 
      if (contra == contra1) {
        //checar si se aceptaron los terminos y condiciones
        if (checar == true) {
          alert("contraseñas iguales");
          //registra al usuario en la consola de firebase
          firebase.auth().createUserWithEmailAndPassword(correo, contra)
            .then(function () {
              alert("Usuario registrado");
              //observador para poder ingresar los datos a firestore de firebase
              firebase.auth().onAuthStateChanged((user) => {
                var uid = user.uid;
                db.collection("Usuarios").doc(uid).set({
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
                  ImagenPerfil:logo,
                  Costoconsulta:""
                })
                  .then((docRef) => {
                    alert("datos agregados a la base de datos");
                    alert("Usuario registrado tienes 3 meses gratis de inscripcion");
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
        var especialidad=[];
        db.collection("Administrador").doc("Especialidades").collection("Especialidad1").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().Estado}`);
        especialidad.push(doc.data().Especialidad)
        });
        for(var x=0;x<=especialidad.length; x++)
        {
          select.options[x] = new Option(especialidad[x]);
        }
        });

  }

  estado() {
    alert("hola")
        const select = document.getElementById("selectestado");
        var estado=[];
        db.collection("Administrador").doc("Estado").collection("Estado1").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().Estado}`);
        estado.push(doc.data().Estado)
        });
        for(var x=0;x<=estado.length; x++)
        {
          select.options[x] = new Option(estado[x]);
        }
        });
        

  }


  //htnl para que se muestre la pagina
  render() {
    return (
      <div className="" onload={this.especialidad, this.estado}>
      <a href="/">Principal</a><br/>
       <a href="/iniciarsesion">Iniciar Sesion</a><br/>
        <a href="/registrarpaciente">Registrar Paciente</a><br/>
        <div className="">
          <form>
            <h1>Registrarte como Medico</h1>
            <div class="form-group">
              <label >Nombre:</label><br />
              <input type="text" id="nombreMedi" class="form-control" />
            </div>
            <div class="form-group">
              <label>Apellido Paterno:</label><br />
              <input type="text" id="apellidoPaternoMedi" class="form-control" />
            </div>
            <div class="form-group">
              <label>Apellido Materno:</label><br />
              <input type="text" id="apellidoMaternoMedi" class="form-control" />
            </div>
            <div class="form-group">
              <label>Especialidad:</label><br />
              <select id="selectespecialidad"></select>
            </div>
            <div class="form-group">
              <label>Cedula Profecional:</label><br />
              <input type="text" id="cedulaProMedi" class="form-control" />
            </div>
            <div class="form-group">
              <label>Telefono:</label><br />
              <input type="number" id="telefonoMedi" class="form-control" />
            </div>
            <div class="form-group">
              <label>Pais:</label><br />
              <input type="text" id="paisMedi" class="form-control" />
            </div>
            <div class="form-group">
              <label>Estado:</label><br />
              <select id="selectestado"></select>
            </div>
            <div class="form-group">
              <label>Fecha Nacimiento:</label><br />
              <input type="date" id="fechaNaciMedi" class="form-control" />
            </div>
            <div class="form-group">
              <label>Correo Electronico:</label><br />
              <input type="email" id="correoElecMedi" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Confirmar Correo Electronico:</label><br />
              <input type="email" id="correoElecunoMedi" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="pwd">Contraseña:</label><br />
              <input type="password" id="contraselaUnoMedi" class="form-control" required />

            </div>
            <div class="form-group">
              <label for="pwd">Confirmar Contraseña:</label><br />
              <input type="password" id="contraselaDosMedi" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="pwd">Describe tu trabajo:</label><br />
              <textarea id="describeTrabajoMedi">
              </textarea><br />

            </div>
            <input type="radio" id="checarMedi" name="aceptar" value="" />Acepto terminos y condiciones<br />
            <input type="button" id="enviar" onClick={this.regis_medi} value="Registrar" />

          </form>
        </div>
      </div>
    );
  }
}
export default regis_medico;

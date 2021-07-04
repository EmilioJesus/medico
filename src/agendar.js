
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




class agendar extends Component {


  componentDidMount() {
    this.determinarUrl();
  }

  determinarUrl() {
    firebase.auth().onAuthStateChanged((user) => {

      if (user) {
        var hoy = new Date();
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var id = urlParams.get('id');
        var horario = urlParams.get('horario');
        var costo =urlParams.get('costo');
        var fecha =urlParams.get('fecha');
        var cita =Date.parse(fecha);
        var tipoconsulta = urlParams.get('tipoconsulta');
        var fechahoy =Date.parse(hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate());
        var horarioinicio = horario.split("-");
        var hora =hoy.getHours() + ":" + hoy.getMinutes();
        var uid = user.uid;
        if (cita<fechahoy) {
          alert("el dia de la cita ya paso");

          window.location.href = "/principal";

        }
        if (cita == fechahoy) {

          if (horarioinicio[0]<hora) {
            alert("El horario de la cita ya paso")
            window.location.href = "/principal";

          } else {
            db.collection("Usuarios").doc(uid)
              .onSnapshot((doc) => {
                console.log("Current data: ", doc.data());
                if(doc.data().Nombre=="")
                {
                  document.getElementById('email').value = doc.data().Email;
                  document.getElementById('fechacita').value = fecha;
                  document.getElementById('horariocita').value = horario;
                  document.getElementById('tipoconsulta').value = tipoconsulta;
                  document.getElementById('preciocita').value = costo;
    
  
                }else
                {
                  document.getElementById('nombrecita').value =doc.data().Nombre;
                  document.getElementById('apellidoPcita').value =doc.data().ApellidoPaterno;
                  document.getElementById('apellidoMcita').value =doc.data().ApellidoMaterno;
                  document.getElementById('telefono').value =doc.data().Telefono;  
                  document.getElementById('email').value = doc.data().Email;
                  document.getElementById('fechacita').value = fecha;
                  document.getElementById('horariocita').value = horario;
                  document.getElementById('tipoconsulta').value = tipoconsulta;
                  document.getElementById('preciocita').value = costo;
  
                }

              });

          }
        }
        if (cita>fechahoy) {
          db.collection("Usuarios").doc(uid)
            .onSnapshot((doc) => {
              console.log("Current data: ", doc.data());
              if(doc.data().Nombre=="")
              {
                document.getElementById('email').value = doc.data().Email;
                document.getElementById('fechacita').value = fecha;
                document.getElementById('horariocita').value = horario;
                document.getElementById('tipoconsulta').value = tipoconsulta;
                document.getElementById('preciocita').value = costo;
              }else
              {
                document.getElementById('nombrecita').value =doc.data().Nombre;
                document.getElementById('apellidoPcita').value =doc.data().ApellidoPaterno;
                document.getElementById('apellidoMcita').value =doc.data().ApellidoMaterno;
                document.getElementById('telefono').value =doc.data().Telefono;  
                document.getElementById('email').value = doc.data().Email;
                document.getElementById('fechacita').value = fecha;
                document.getElementById('horariocita').value = horario;
                document.getElementById('tipoconsulta').value = tipoconsulta;
                document.getElementById('preciocita').value = costo;

              }

            });

        }
      } else {
        alert("Usuario no logeado");
        window.location.href = "/";

      }

    });



  }

  agendar() {
    var personacita = document.getElementById('personacita').value;
    var motivocita = document.getElementById('motivocita').value;
    var primeracita = document.getElementById('primeracita').value;
    var nombrecita = document.getElementById('nombrecita').value;
    var apellidoPcita = document.getElementById('apellidoPcita').value;
    var apellidoMcita = document.getElementById('apellidoMcita').value;
    var telefono = document.getElementById('telefono').value;
    var email = document.getElementById('email').value;
    var fechacita = document.getElementById('fechacita').value;
    var horariocita = document.getElementById('horariocita').value;
    var tipocita = document.getElementById('tipoconsulta').value;
    var comentarios = document.getElementById('comentarios').value;
    var costo = document.getElementById('preciocita').value;

    if (personacita != "" && motivocita != "" && personacita != "" && nombrecita != "" && apellidoPcita != "" && apellidoMcita != "" && telefono != "" && email != "" && fechacita != "" && horariocita != "" && tipocita != "" && comentarios != "") {
      firebase.auth().onAuthStateChanged((user) => {
        alert("no hay campos vacios");
        if (user) {
          var uid = user.uid;
          var queryString = window.location.search;
          var urlParams = new URLSearchParams(queryString);
          var id = urlParams.get('id');
          var indice = urlParams.get('indice');
          var dia = urlParams.get('dia');

          db.collection("Usuarios").doc(uid).update({
            Nombre: nombrecita,
            ApellidoPaterno: apellidoPcita,
            ApellidoMaterno: apellidoMcita,
            Telefono: telefono
          }).then((docRef) => {
          })


          db.collection("Usuarios").doc(uid)
            .onSnapshot((doc) => {
              var imagen = doc.data().ImagenPerfil;
              db.collection("Usuarios").doc(id).collection('Citas').add({
                idpaciente: uid,
                Imagenperfil: imagen,
                Motivocita: motivocita,
                Primeracita: primeracita,
                Nombrecita: nombrecita,
                ApellidoPcita: apellidoPcita,
                ApellidoMcita: apellidoMcita,
                Telefono: telefono,
                Email: email,
                Fechacita: fechacita,
                Horariocita: horariocita,
                Tipocita: tipocita,
                Indice: indice,
                Diacita: dia,
                Comentarios: comentarios,
                Costoconsulta:costo,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()

              })
                .then((docRef) => {
                  db.collection("Usuarios").doc(id)
                    .onSnapshot((doc) => {
                      var docimagen = doc.data().ImagenPerfil;
                      var docnombre = doc.data().Nombre;
                      var docapellidopaterno = doc.data().ApellidoPaterno;
                      var docapellidomaterno = doc.data().ApellidoMaterno;
                      var doctelefono = doc.data().Telefono;
                      var docemail = doc.data().Email;
                      var docespecialidad = doc.data().Especialidad;
                      db.collection("Usuarios").doc(uid).collection('Citas').doc(docRef.id).set({
                        iddoctor: id,
                        Imagenperfil:docimagen,
                        Motivocita: motivocita,
                        Primeracita: primeracita,
                        Nombrecita: docnombre,
                        ApellidoPcita: docapellidopaterno,
                        ApellidoMcita: docapellidomaterno,
                        Telefono: doctelefono,
                        Email: docemail,
                        Fechacita: fechacita,
                        Horariocita: horariocita,
                        Tipocita: tipocita,
                        Indice: indice,
                        Diacita: dia,
                        Especialidad:docespecialidad,
                        Comentarios: comentarios,
                        Costoconsulta:costo,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()

                      })
                        .then((docRef) => {
                          alert("Cita realizada");
                          //window.location.href = "/citas_paciente";
                          if (tipocita == "Presencial") {
                            db.collection("Usuarios/" + id + "/HorariosPresencial").doc(dia).collection(dia+"1").doc(indice).update({ 
                              hora:"" 
                              });
                             window.location.href = "/citaspaciente"; 

                          } else {
                            db.collection("Usuarios/" + id + "/HorariosLinea").doc(dia).collection(dia+"1").doc(indice).update({ 
                              hora:"" 
                              });
                             window.location.href = "/citaspaciente"; 
                          }
                        })
                        .catch((error) => {
                          console.error("Error adding document: ", error);
                          alert(error);
                        });
                    });

                })
                .catch((error) => {
                  console.error("Error adding document: ", error);
                  alert(error);
                });
            });

        } else {
          alert("Usuario no logeado");
          window.location.href = "/";

        }
      });

    } else {
      alert("hay campos vacios");
    }

  }










  //html que se muestra en la pagina   
  render() {
    return (
      <div className="App" onload={this.especialidad, this.estado}>
        <h2>Agendar</h2>
        <label>¿Para quien la cita?</label><br />
        <select id="personacita">
          <option>Para mi</option>
          <option>Para otra persona</option>
        </select><br />
        <label>Motivo de la visita</label><br />
        <textarea id="motivocita"></textarea><br />
        <label>Es primera visita</label><br />
        <select id="primeracita">
          <option>Si</option>
          <option>No</option>
        </select><br />
        <label>Nombres</label><br />
        <input type="text" id="nombrecita"></input><br />
        <label>Apellido Paterno</label><br />
        <input type="text" id="apellidoPcita"></input><br />
        <label>Apellido Materno</label><br />
        <input type="text" id="apellidoMcita"></input><br />
        <label >Telefono</label><br />
        <input type="number" id="telefono"></input><br />
        <label>Email</label><br />
        <input type="email" id="email" disabled></input><br />
        <label>Precio de la cita</label><br />
        <input type="text" id="preciocita" disabled></input><br />
        <label>Fecha de la cita</label><br />
        <input type="text" id="fechacita" disabled></input><br />
        <label>Horario de la cita</label><br />
        <input type="text" id="horariocita" disabled></input><br />
        <label>Tipo de consulta</label><br />
        <input type="text" id="tipoconsulta" disabled></input><br />
        <label>Comentarios</label><br />
        <textarea id="comentarios"></textarea><br />
        <input type="button" onClick={this.agendar} value="Agendar" />
      </div>
    );
  }
}

export default agendar;

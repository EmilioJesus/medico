import React, { Component } from "react";
import db from "./firebase_config";
import firebase from "firebase/app";
import "firebase/auth";
import MenuLoggedUser from "./Components/Menu/MenuLoggedUser";

class citaspaciente extends React.Component {
   componentDidMount() {
      this.citas();
      this.cancelar();
      this.citascanceladas();
      this.citasrealizadas();
   }

   citas() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            var citas = document.getElementById("resultadocitas");
            db.collection("Usuarios/" + uid + "/Citas")
               .orderBy("timestamp", "asc")
               .onSnapshot((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                     console.log(`${doc.id} => ${doc.data()}`);
                     var imagen = doc.data().Imagenperfil;
                     var nombre = doc.data().Nombrecita;
                     var apellidop = doc.data().ApellidoPcita;
                     var apellidom = doc.data().ApellidoMcita;
                     var nombre1 = nombre + " " + apellidop + " " + apellidom;
                     var email = doc.data().Email;
                     var especialidad = doc.data().Especialidad;
                     var telefono = doc.data().Telefono;
                     var primeracita = doc.data().Primeracita;
                     var motivo = doc.data().Motivocita;
                     var tipocita = doc.data().Tipocita;
                     var fecha = doc.data().Fechacita;
                     var cita = Date.parse(fecha);
                     var horario = doc.data().Horariocita;
                     var comentario = doc.data().Comentarios;
                     var iddoctor = doc.data().iddoctor;
                     var dia = doc.data().Diacita;
                     var indice = doc.data().Indice;
                     var costo = doc.data().Costoconsulta;
                     var id = doc.id;
                     var hoy = new Date();
                     var fechahoy = Date.parse(
                        hoy.getUTCFullYear() +
                           "/" +
                           (hoy.getMonth() + 1) +
                           "/" +
                           hoy.getDate()
                     );
                     if (fechahoy > cita) {
                        db.collection("Usuarios")
                           .doc(uid)
                           .collection("Citasrealizadas")
                           .doc(id)
                           .set({
                              iddoctor: id,
                              Imagenperfil: imagen,
                              Motivocita: motivo,
                              Primeracita: primeracita,
                              Nombrecita: nombre,
                              ApellidoPcita: apellidop,
                              ApellidoMcita: apellidom,
                              Telefono: telefono,
                              Email: email,
                              Fechacita: fecha,
                              Horariocita: horario,
                              Tipocita: tipocita,
                              Diacita: dia,
                              Comentarios: comentario,
                              timestamp:
                                 firebase.firestore.FieldValue.serverTimestamp(),
                           })

                           .then((docRef) => {
                              db.collection("Usuarios")
                                 .doc(uid)
                                 .collection("Citas")
                                 .doc(id)
                                 .delete()
                                 .then(() => {
                                    console.log(
                                       "Document successfully deleted!"
                                    );
                                    if (tipocita == "Presencial") {
                                       db.collection(
                                          "Usuarios/" +
                                             iddoctor +
                                             "/HorariosPresencial"
                                       )
                                          .doc(dia)
                                          .collection(dia + "1")
                                          .doc(indice)
                                          .update({
                                             hora: horario,
                                          });
                                    } else {
                                       db.collection(
                                          "Usuarios/" +
                                             iddoctor +
                                             "/HorariosLinea"
                                       )
                                          .doc(dia)
                                          .collection(dia + "1")
                                          .doc(indice)
                                          .update({
                                             hora: horario,
                                          });
                                    }
                                 })
                                 .catch((error) => {
                                    console.error(
                                       "Error removing document: ",
                                       error
                                    );
                                 });
                           });
                     } else {
                        citas.innerHTML += `
                          
                          </br><label>${id}</label></br>
                          <img src=${imagen} style="width:10%;height:150px"/></br>
                          <label>Nombre:DR. ${nombre1}</label></br>
                          <label>Especialidad:${especialidad}</label></br>
                          <label>Costo consulta:$${costo}</label></br>
                          <label>Email: ${email}</label></br>
                          <label>Telefono: ${telefono}</label></br>
                          <label>Primera cita: ${primeracita}</label></br>
                          <label>Motivo: ${motivo}</label></br>
                          <label>Tipo cita: ${tipocita}</label></br>
                          <label>Dia: ${dia}</label></br>
                          <label>Fecha: ${fecha}</label></br>
                          <label>Horario: ${horario}</label></br>
                          <label>Comentario: ${comentario}</label></br>
                          <a href="/citaspaciente?id=${id}&iddoctor=${iddoctor}">Cancelar</a>
                          
                          
                          `;
                     }
                  });
                  if(citas.innerHTML=="")
                  {
                     citas.innerHTML += `<h2>Todavia no hay resultados</h2></br>`

                  }
               });
         }
      });
   }

   cancelar() {
      var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);
      var id = urlParams.get("id");
      var iddoctor = urlParams.get("iddoctor");
      if (id != null) {
         firebase.auth().onAuthStateChanged((user) => {
            var uid = user.uid;
            db.collection("Usuarios/" + uid + "/Citas")
               .doc(id)
               .onSnapshot((doc) => {
                  if (doc.exists) {
                     var imagen = doc.data().Imagenperfil;
                     var nombre = doc.data().Nombrecita;
                     var apellidop = doc.data().ApellidoPcita;
                     var apellidom = doc.data().ApellidoMcita;
                     var email = doc.data().Email;
                     var especialidad = doc.data().Especialidad;
                     var telefono = doc.data().Telefono;
                     var primeracita = doc.data().Primeracita;
                     var motivo = doc.data().Motivocita;
                     var tipocita = doc.data().Tipocita;
                     var fecha = doc.data().Fechacita;
                     var horario = doc.data().Horariocita;
                     var comentario = doc.data().Comentarios;
                     var dia = doc.data().Diacita;
                     var indice = doc.data().Indice;
                     var costo = doc.data().Costoconsulta;

                     db.collection("Usuarios")
                        .doc(uid)
                        .collection("Citascanceladas")
                        .add({
                           Imagenperfil: imagen,
                           Motivocita: motivo,
                           Primeracita: primeracita,
                           Nombrecita: nombre,
                           ApellidoPcita: apellidop,
                           ApellidoMcita: apellidom,
                           Telefono: telefono,
                           Email: email,
                           Fechacita: fecha,
                           Horariocita: horario,
                           Tipocita: tipocita,
                           Diacita: dia,
                           Comentarios: comentario,
                           Especialidad: especialidad,
                           Costoconsulta: costo,
                           iddoctor: iddoctor,
                           timestamp:
                              firebase.firestore.FieldValue.serverTimestamp(),
                        })
                        .then((docRef) => {
                           db.collection("Usuarios/" + iddoctor + "/Citas")
                              .doc(id)
                              .onSnapshot((doc) => {
                                 if (doc.exists) {
                                    var imagen = doc.data().Imagenperfil;
                                    var nombre = doc.data().Nombrecita;
                                    var apellidop = doc.data().ApellidoPcita;
                                    var apellidom = doc.data().ApellidoMcita;
                                    var email = doc.data().Email;
                                    var telefono = doc.data().Telefono;
                                    var primeracita = doc.data().Primeracita;
                                    var motivo = doc.data().Motivocita;
                                    var tipocita = doc.data().Tipocita;
                                    var fecha = doc.data().Fechacita;
                                    var horario = doc.data().Horariocita;
                                    var comentario = doc.data().Comentarios;
                                    var dia = doc.data().Diacita;
                                    var indice = doc.data().Indice;
                                    db.collection("Usuarios")
                                       .doc(iddoctor)
                                       .collection("Citascanceladas")
                                       .doc(docRef.id)
                                       .set({
                                          Imagenperfil: imagen,
                                          Motivocita: motivo,
                                          Primeracita: primeracita,
                                          Nombrecita: nombre,
                                          ApellidoPcita: apellidop,
                                          ApellidoMcita: apellidom,
                                          Telefono: telefono,
                                          Email: email,
                                          Fechacita: fecha,
                                          Horariocita: horario,
                                          Tipocita: tipocita,
                                          Diacita: dia,
                                          Comentarios: comentario,
                                          Costoconsulta: costo,
                                          idpaciente: uid,
                                          timestamp:
                                             firebase.firestore.FieldValue.serverTimestamp(),
                                       })
                                       .then((docRef) => {
                                          db.collection("Usuarios")
                                             .doc(uid)
                                             .collection("Citas")
                                             .doc(id)
                                             .delete()
                                             .then(() => {
                                                console.log(
                                                   "Document successfully deleted!"
                                                );
                                                db.collection("Usuarios")
                                                   .doc(iddoctor)
                                                   .collection("Citas")
                                                   .doc(id)
                                                   .delete()
                                                   .then(() => {
                                                      console.log(
                                                         "Document successfully deleted!"
                                                      );
                                                      if (
                                                         tipocita ==
                                                         "Presencial"
                                                      ) {
                                                         db.collection(
                                                            "Usuarios/" +
                                                               iddoctor +
                                                               "/HorariosPresencial"
                                                         )
                                                            .doc(dia)
                                                            .collection(
                                                               dia + "1"
                                                            )
                                                            .doc(indice)
                                                            .update({
                                                               hora: horario,
                                                            });
                                                         window.location.href =
                                                            "/citaspaciente";
                                                      } else {
                                                         db.collection(
                                                            "Usuarios/" +
                                                               iddoctor +
                                                               "/HorariosLinea"
                                                         )
                                                            .doc(dia)
                                                            .collection(
                                                               dia + "1"
                                                            )
                                                            .doc(indice)
                                                            .update({
                                                               hora: horario,
                                                            });
                                                         window.location.href =
                                                            "/citaspaciente";
                                                      }
                                                      //window.location.href = "/citaspaciente";
                                                   })
                                                   .catch((error) => {
                                                      console.error(
                                                         "Error removing document: ",
                                                         error
                                                      );
                                                   });
                                             });
                                       })
                                       .catch((error) => {
                                          console.error(
                                             "Error removing document: ",
                                             error
                                          );
                                       });
                                 }
                              })
                              .catch((error) => {
                                 console.error(
                                    "Error removing document: ",
                                    error
                                 );
                              });
                        })
                        .catch((error) => {
                           console.error("Error removing document: ", error);
                        });
                  }
               });
         });
      }
   }

   citascanceladas() {
      var citas1 = (document.getElementById("citascanceladas").innerHTML = "");
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            var citas = document.getElementById("citascanceladas");
            db.collection("Usuarios/" + uid + "/Citascanceladas")
               .orderBy("timestamp", "asc")
               .onSnapshot((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                     var imagen = doc.data().Imagenperfil;
                     var nombre = doc.data().Nombrecita;
                     var apellidop = doc.data().ApellidoPcita;
                     var apellidom = doc.data().ApellidoMcita;
                     var nombre1 = nombre + " " + apellidop + " " + apellidom;
                     var email = doc.data().Email;
                     var especialidad = doc.data().Especialidad;
                     var telefono = doc.data().Telefono;
                     var primeracita = doc.data().Primeracita;
                     var motivo = doc.data().Motivocita;
                     var tipocita = doc.data().Tipocita;
                     var fecha = doc.data().Fechacita;
                     var horario = doc.data().Horariocita;
                     var comentario = doc.data().Comentarios;
                     var iddoctor = doc.data().iddoctor;
                     var dia = doc.data().Diacita;
                     var indice = doc.data().Indice;
                     var costo = doc.data().Costoconsulta;
                     var id = doc.id;
                     citas.innerHTML += `
                          </br><label>${id}</label></br>
                          <img src=${imagen} style="width:10%;height:150px"/></br>
                          <label>Nombre:DR. ${nombre1}</label></br>
                          <label>Especialidad:${especialidad}</label></br>
                          <label>Costo consulta:$${costo}</label></br>
                          <label>Email: ${email}</label></br>
                          <label>Telefono: ${telefono}</label></br>
                          <label>Primera cita: ${primeracita}</label></br>
                          <label>Motivo: ${motivo}</label></br>
                          <label>Tipo cita: ${tipocita}</label></br>
                          <label>Dia: ${dia}</label></br>
                          <label>Fecha: ${fecha}</label></br>
                          <label>Horario: ${horario}</label></br>
                          <label>Comentario: ${comentario}</label></br>
                          `;
                  });
                  if(citas.innerHTML=="")
                  {
                     citas.innerHTML += `<h2>Todavia no hay resultados</h2></br>`

                  }
               });
         }
      });
   }

   citasrealizadas() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            var citas = document.getElementById("citasrealizadas");
            db.collection("Usuarios/" + uid + "/Citasrealizadas")
               .orderBy("timestamp", "asc")
               .onSnapshot((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                     var imagen = doc.data().Imagenperfil;
                     var nombre = doc.data().Nombrecita;
                     var apellidop = doc.data().ApellidoPcita;
                     var apellidom = doc.data().ApellidoMcita;
                     var nombre1 = nombre + "" + apellidop + "" + apellidom;
                     var email = doc.data().Email;
                     var especialidad = doc.data().Especialidad;
                     var telefono = doc.data().Telefono;
                     var primeracita = doc.data().Primeracita;
                     var motivo = doc.data().Motivocita;
                     var tipocita = doc.data().Tipocita;
                     var fecha = doc.data().Fechacita;
                     var horario = doc.data().Horariocita;
                     var comentario = doc.data().Comentarios;
                     var iddoctor = doc.data().iddoctor;
                     var dia = doc.data().Diacita;
                     var indice = doc.data().Indice;
                     var costo = doc.data().Costoconsulta;
                     var id = doc.id;
                     citas.innerHTML += `
                          </br><label>${id}</label></br>
                          <img src=${imagen} style="width:10%;height:150px"/></br>
                          <label>Nombre:DR. ${nombre1}</label></br>
                          <label>Especialidad:${especialidad}</label></br>
                          <label>Costo consulta:$${costo}</label></br>
                          <label>Email: ${email}</label></br>
                          <label>Telefono: ${telefono}</label></br>
                          <label>Primera cita: ${primeracita}</label></br>
                          <label>Motivo: ${motivo}</label></br>
                          <label>Tipo cita: ${tipocita}</label></br>
                          <label>Dia: ${dia}</label></br>
                          <label>Fecha: ${fecha}</label></br>
                          <label>Horario: ${horario}</label></br>
                          <label>Comentario: ${comentario}</label></br>
                          
                          `;
                  });
                  if(citas.innerHTML=="")
                  {
                     citas.innerHTML += `<h2>Todavia no hay resultados</h2></br>`

                  }
               });
         }
      });
   }

   cerrar_sesion() {
      firebase
         .auth()
         .signOut()
         .then(() => {
            // Sign-out successful.
            alert("La sesion se a cerrado");
            window.location.href = "/";
         })
         .catch((error) => {
            // An error happened.
         });
   }

   render() {
      return (
         <div onLoad={this.citas}>
            <MenuLoggedUser />

            <h2>Citas</h2>
            <div id="resultadocitas" style={{ overflow: "auto" }}></div>
            <h2>Citas canceladas</h2>
            <div id="citascanceladas" style={{ overflow: "auto" }}></div>
            <h2>Citas realizadas</h2>
            <div id="citasrealizadas" style={{ overflow: "auto" }}></div>
         </div>
      );
   }
}

export default citaspaciente;

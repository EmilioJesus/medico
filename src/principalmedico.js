import React, { Component } from "react";
import db from "./firebase_config";
import firebase from "firebase/app";
import "firebase/auth";
import ContenedorCard from "./Components/Cards/ContentCard";
import ContenedorTestimonial from "./Components/Cards/ContenedorTestimonial";
import Menu from "./Components/Menu/Menu";
const img = require.context("./imagenes", true);
class principalmedico extends Component {
   componentDidMount() {
      this.especialidad();
      this.estado();
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
               estado.push(doc.data().Estado);
            });
            for (var x = 0; x <= estado.length; x++) {
               select.options[x] = new Option(estado[x]);
            }
         });
   }

   buscardocores() {
      var hoy = new Date();
      var dia = hoy.getDay();
      var lunesfecha,
         martesfecha,
         miercolesfecha,
         juevesfecha,
         viernesfecha,
         sabadofecha,
         domingofecha;
      if (dia == 1) {
         lunesfecha =
            hoy.getFullYear() +
            "/" +
            (hoy.getMonth() + 1) +
            "/" +
            hoy.getDate();
         var martessuma = hoy.getTime() + 1 * 24 * 60 * 60 * 1000;
         var martesresultado = new Date(martessuma);
         martesfecha =
            martesresultado.getFullYear() +
            "/" +
            (martesresultado.getMonth() + 1) +
            "/" +
            martesresultado.getDate();
         var miercolessuma = hoy.getTime() + 2 * 24 * 60 * 60 * 1000;
         var miercolesresultado = new Date(miercolessuma);
         miercolesfecha =
            miercolesresultado.getFullYear() +
            "/" +
            (miercolesresultado.getMonth() + 1) +
            "/" +
            miercolesresultado.getDate();
         var juevessuma = hoy.getTime() + 3 * 24 * 60 * 60 * 1000;
         var juevesresultado = new Date(juevessuma);
         juevesfecha =
            juevesresultado.getFullYear() +
            "/" +
            (juevesresultado.getMonth() + 1) +
            "/" +
            juevesresultado.getDate();
         var viernessuma = hoy.getTime() + 4 * 24 * 60 * 60 * 1000;
         var viernesresultado = new Date(viernessuma);
         viernesfecha =
            viernesresultado.getFullYear() +
            "/" +
            (viernesresultado.getMonth() + 1) +
            "/" +
            viernesresultado.getDate();
         var sabadosuma = hoy.getTime() + 5 * 24 * 60 * 60 * 1000;
         var sabadoresultado = new Date(sabadosuma);
         sabadofecha =
            sabadoresultado.getFullYear() +
            "/" +
            (sabadoresultado.getMonth() + 1) +
            "/" +
            sabadoresultado.getDate();
         var domingosuma = hoy.getTime() + 6 * 24 * 60 * 60 * 1000;
         var domingoresultado = new Date(domingosuma);
         domingofecha =
            domingoresultado.getFullYear() +
            "/" +
            (domingoresultado.getMonth() + 1) +
            "/" +
            domingoresultado.getDate();
      }
      if (dia == 2) {
         var lunessuma = hoy.getTime() + 6 * 24 * 60 * 60 * 1000;
         var lunesresultado = new Date(lunessuma);
         lunesfecha =
            lunesresultado.getFullYear() +
            "/" +
            (lunesresultado.getMonth() + 1) +
            "/" +
            lunesresultado.getDate();
         martesfecha =
            hoy.getFullYear() +
            "/" +
            (hoy.getMonth() + 1) +
            "/" +
            hoy.getDate();
         var miercolessuma = hoy.getTime() + 1 * 24 * 60 * 60 * 1000;
         var miercolesresultado = new Date(miercolessuma);
         miercolesfecha =
            miercolesresultado.getFullYear() +
            "/" +
            (miercolesresultado.getMonth() + 1) +
            "/" +
            miercolesresultado.getDate();
         var juevessuma = hoy.getTime() + 2 * 24 * 60 * 60 * 1000;
         var juevesresultado = new Date(juevessuma);
         juevesfecha =
            juevesresultado.getFullYear() +
            "/" +
            (juevesresultado.getMonth() + 1) +
            "/" +
            juevesresultado.getDate();
         var viernessuma = hoy.getTime() + 3 * 24 * 60 * 60 * 1000;
         var viernesresultado = new Date(viernessuma);
         viernesfecha =
            viernesresultado.getFullYear() +
            "/" +
            (viernesresultado.getMonth() + 1) +
            "/" +
            viernesresultado.getDate();
         var sabadosuma = hoy.getTime() + 4 * 24 * 60 * 60 * 1000;
         var sabadoresultado = new Date(sabadosuma);
         sabadofecha =
            sabadoresultado.getFullYear() +
            "/" +
            (sabadoresultado.getMonth() + 1) +
            "/" +
            sabadoresultado.getDate();
         var domingosuma = hoy.getTime() + 5 * 24 * 60 * 60 * 1000;
         var domingoresultado = new Date(domingosuma);
         domingofecha =
            domingoresultado.getFullYear() +
            "/" +
            (domingoresultado.getMonth() + 1) +
            "/" +
            domingoresultado.getDate();
      }
      if (dia == 3) {
         var lunessuma = hoy.getTime() + 5 * 24 * 60 * 60 * 1000;
         var lunesresultado = new Date(lunessuma);
         lunesfecha =
            lunesresultado.getFullYear() +
            "/" +
            (lunesresultado.getMonth() + 1) +
            "/" +
            lunesresultado.getDate();
         var martessuma = hoy.getTime() + 6 * 24 * 60 * 60 * 1000;
         var martesresultado = new Date(martessuma);
         martesfecha =
            martesresultado.getFullYear() +
            "/" +
            (martesresultado.getMonth() + 1) +
            "/" +
            martesresultado.getDate();
         miercolesfecha =
            hoy.getFullYear() +
            "/" +
            (hoy.getMonth() + 1) +
            "/" +
            hoy.getDate();
         var juevessuma = hoy.getTime() + 1 * 24 * 60 * 60 * 1000;
         var juevesresultado = new Date(juevessuma);
         juevesfecha =
            juevesresultado.getFullYear() +
            "/" +
            (juevesresultado.getMonth() + 1) +
            "/" +
            juevesresultado.getDate();
         var viernessuma = hoy.getTime() + 2 * 24 * 60 * 60 * 1000;
         var viernesresultado = new Date(viernessuma);
         viernesfecha =
            viernesresultado.getFullYear() +
            "/" +
            (viernesresultado.getMonth() + 1) +
            "/" +
            viernesresultado.getDate();
         var sabadosuma = hoy.getTime() + 3 * 24 * 60 * 60 * 1000;
         var sabadoresultado = new Date(sabadosuma);
         sabadofecha =
            sabadoresultado.getFullYear() +
            "/" +
            (sabadoresultado.getMonth() + 1) +
            "/" +
            sabadoresultado.getDate();
         var domingosuma = hoy.getTime() + 4 * 24 * 60 * 60 * 1000;
         var domingoresultado = new Date(domingosuma);
         domingofecha =
            domingoresultado.getFullYear() +
            "/" +
            (domingoresultado.getMonth() + 1) +
            "/" +
            domingoresultado.getDate();
      }
      if (dia == 4) {
         var lunessuma = hoy.getTime() + 4 * 24 * 60 * 60 * 1000;
         var lunesresultado = new Date(lunessuma);
         lunesfecha =
            lunesresultado.getFullYear() +
            "/" +
            (lunesresultado.getMonth() + 1) +
            "/" +
            lunesresultado.getDate();
         var martessuma = hoy.getTime() + 5 * 24 * 60 * 60 * 1000;
         var martesresultado = new Date(martessuma);
         martesfecha =
            martesresultado.getFullYear() +
            "/" +
            (martesresultado.getMonth() + 1) +
            "/" +
            martesresultado.getDate();
         var miercolessuma = hoy.getTime() + 6 * 24 * 60 * 60 * 1000;
         var miercolesresultado = new Date(miercolessuma);
         miercolesfecha =
            miercolesresultado.getFullYear() +
            "/" +
            (miercolesresultado.getMonth() + 1) +
            "/" +
            miercolesresultado.getDate();
         juevesfecha =
            hoy.getFullYear() +
            "/" +
            (hoy.getMonth() + 1) +
            "/" +
            hoy.getDate();
         var viernessuma = hoy.getTime() + 1 * 24 * 60 * 60 * 1000;
         var viernesresultado = new Date(viernessuma);
         viernesfecha =
            viernesresultado.getFullYear() +
            "/" +
            (viernesresultado.getMonth() + 1) +
            "/" +
            viernesresultado.getDate();
         var sabadosuma = hoy.getTime() + 2 * 24 * 60 * 60 * 1000;
         var sabadoresultado = new Date(sabadosuma);
         sabadofecha =
            sabadoresultado.getFullYear() +
            "/" +
            (sabadoresultado.getMonth() + 1) +
            "/" +
            sabadoresultado.getDate();
         var domingosuma = hoy.getTime() + 3 * 24 * 60 * 60 * 1000;
         var domingoresultado = new Date(domingosuma);
         domingofecha =
            domingoresultado.getFullYear() +
            "/" +
            (domingoresultado.getMonth() + 1) +
            "/" +
            domingoresultado.getDate();
      }

      if (dia == 5) {
         var lunessuma = hoy.getTime() + 3 * 24 * 60 * 60 * 1000;
         var lunesresultado = new Date(lunessuma);
         lunesfecha =
            lunesresultado.getFullYear() +
            "/" +
            (lunesresultado.getMonth() + 1) +
            "/" +
            lunesresultado.getDate();
         var martessuma = hoy.getTime() + 4 * 24 * 60 * 60 * 1000;
         var martesresultado = new Date(martessuma);
         martesfecha =
            martesresultado.getFullYear() +
            "/" +
            (martesresultado.getMonth() + 1) +
            "/" +
            martesresultado.getDate();
         var miercolessuma = hoy.getTime() + 5 * 24 * 60 * 60 * 1000;
         var miercolesresultado = new Date(miercolessuma);
         miercolesfecha =
            miercolesresultado.getFullYear() +
            "/" +
            (miercolesresultado.getMonth() + 1) +
            "/" +
            miercolesresultado.getDate();
         var juevessuma = hoy.getTime() + 6 * 24 * 60 * 60 * 1000;
         var juevesresultado = new Date(juevessuma);
         juevesfecha =
            juevesresultado.getFullYear() +
            "/" +
            (juevesresultado.getMonth() + 1) +
            "/" +
            juevesresultado.getDate();
         viernesfecha =
            hoy.getFullYear() +
            "/" +
            (hoy.getMonth() + 1) +
            "/" +
            hoy.getDate();
         var sabadosuma = hoy.getTime() + 1 * 24 * 60 * 60 * 1000;
         var sabadoresultado = new Date(sabadosuma);
         sabadofecha =
            sabadoresultado.getFullYear() +
            "/" +
            (sabadoresultado.getMonth() + 1) +
            "/" +
            sabadoresultado.getDate();
         var domingosuma = hoy.getTime() + 2 * 24 * 60 * 60 * 1000;
         var domingoresultado = new Date(domingosuma);
         domingofecha =
            domingoresultado.getFullYear() +
            "/" +
            (domingoresultado.getMonth() + 1) +
            "/" +
            domingoresultado.getDate();
      }

      if (dia == 6) {
         var lunessuma = hoy.getTime() + 2 * 24 * 60 * 60 * 1000;
         var lunesresultado = new Date(lunessuma);
         lunesfecha =
            lunesresultado.getFullYear() +
            "/" +
            (lunesresultado.getMonth() + 1) +
            "/" +
            lunesresultado.getDate();
         var martessuma = hoy.getTime() + 3 * 24 * 60 * 60 * 1000;
         var martesresultado = new Date(martessuma);
         martesfecha =
            martesresultado.getFullYear() +
            "/" +
            (martesresultado.getMonth() + 1) +
            "/" +
            martesresultado.getDate();
         var miercolessuma = hoy.getTime() + 4 * 24 * 60 * 60 * 1000;
         var miercolesresultado = new Date(miercolessuma);
         miercolesfecha =
            miercolesresultado.getFullYear() +
            "/" +
            (miercolesresultado.getMonth() + 1) +
            "/" +
            miercolesresultado.getDate();
         var juevessuma = hoy.getTime() + 5 * 24 * 60 * 60 * 1000;
         var juevesresultado = new Date(juevessuma);
         juevesfecha =
            juevesresultado.getFullYear() +
            "/" +
            (juevesresultado.getMonth() + 1) +
            "/" +
            juevesresultado.getDate();
         var viernessuma = hoy.getTime() + 6 * 24 * 60 * 60 * 1000;
         var viernesresultado = new Date(viernessuma);
         viernesfecha =
            viernesresultado.getFullYear() +
            "/" +
            (viernesresultado.getMonth() + 1) +
            "/" +
            viernesresultado.getDate();
         sabadofecha =
            hoy.getFullYear() +
            "/" +
            (hoy.getMonth() + 1) +
            "/" +
            hoy.getDate();
         var domingosuma = hoy.getTime() + 1 * 24 * 60 * 60 * 1000;
         var domingoresultado = new Date(domingosuma);
         domingofecha =
            domingoresultado.getFullYear() +
            "/" +
            (domingoresultado.getMonth() + 1) +
            "/" +
            domingoresultado.getDate();
      }
      if (dia == 0) {
         var lunessuma = hoy.getTime() + 1 * 24 * 60 * 60 * 1000;
         var lunesresultado = new Date(lunessuma);
         lunesfecha =
            lunesresultado.getFullYear() +
            "/" +
            (lunesresultado.getMonth() + 1) +
            "/" +
            lunesresultado.getDate();
         var martessuma = hoy.getTime() + 2 * 24 * 60 * 60 * 1000;
         var martesresultado = new Date(martessuma);
         martesfecha =
            martesresultado.getFullYear() +
            "/" +
            (martesresultado.getMonth() + 1) +
            "/" +
            martesresultado.getDate();
         var miercolessuma = hoy.getTime() + 3 * 24 * 60 * 60 * 1000;
         var miercolesresultado = new Date(miercolessuma);
         miercolesfecha =
            miercolesresultado.getFullYear() +
            "/" +
            (miercolesresultado.getMonth() + 1) +
            "/" +
            miercolesresultado.getDate();
         var juevessuma = hoy.getTime() + 4 * 24 * 60 * 60 * 1000;
         var juevesresultado = new Date(juevessuma);
         juevesfecha =
            juevesresultado.getFullYear() +
            "/" +
            (juevesresultado.getMonth() + 1) +
            "/" +
            juevesresultado.getDate();
         var viernessuma = hoy.getTime() + 5 * 24 * 60 * 60 * 1000;
         var viernesresultado = new Date(viernessuma);
         viernesfecha =
            viernesresultado.getFullYear() +
            "/" +
            (viernesresultado.getMonth() + 1) +
            "/" +
            viernesresultado.getDate();
         var sabadosuma = hoy.getTime() + 6 * 24 * 60 * 60 * 1000;
         var sabadoresultado = new Date(sabadosuma);
         sabadofecha =
            sabadoresultado.getFullYear() +
            "/" +
            (sabadoresultado.getMonth() + 1) +
            "/" +
            sabadoresultado.getDate();
         domingofecha =
            hoy.getFullYear() +
            "-" +
            (hoy.getMonth() + 1) +
            "-" +
            hoy.getDate();
      }

      var vacio = (document.getElementById("resultadosbusqueda1").innerHTML =
         "");
      const especialidad = document.getElementById("selectespecialidad").value;
      const estado = document.getElementById("selectestado").value;
      const consultatipo = document.getElementById("selecconsultatipo").value;
      const resultados = document.getElementById("resultadosbusqueda1");
      const horarios = document.getElementById("horarios");
      if (consultatipo == "En linea") {
         db.collection("Usuarios")
            .where("Especialidad", "==", especialidad)
            .where("TipoUsuario", "==", "Doctor")
            .where("Estado", "==", estado)
            .onSnapshot((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  var codijo = doc.id;
                  var nombre1 = doc.data().Nombre;
                  var apellidopaterno = doc.data().ApellidoPaterno;
                  var apellidomaterno = doc.data().ApellidoMaterno;
                  var nombre =
                     nombre1 + " " + apellidopaterno + " " + apellidomaterno;
                  var cedula = doc.data().Cedula;
                  var email = doc.data().Email;
                  var especialidad = doc.data().Especialidad;
                  var descripcion = doc.data().Descripcion;
                  var estadores = doc.data().Estado;
                  var imagenperfil = doc.data().ImagenPerfil;
                  var costo = doc.data().Costoconsulta;
                  var lunes = [];
                  var martes = [];
                  var miercoles = [];
                  var jueves = [];
                  var viernes = [];
                  var sabado = [];
                  var domingo = [];
                  var lunes1 = [];
                  var martes1 = [];
                  var miercoles1 = [];
                  var jueves1 = [];
                  var viernes1 = [];
                  var sabado1 = [];
                  var domingo1 = [];

                  db.collection(
                     "Usuarios/" + doc.id + "/HorariosLinea/Lunes/Lunes1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           lunes.push(doc.data().hora);
                           lunes1.push(doc.id);
                        });
                     });

                  db.collection(
                     "Usuarios/" + doc.id + "/HorariosLinea/Martes/Martes1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           martes.push(doc.data().hora);
                           martes1.push(doc.id);
                        });
                     });

                  db.collection(
                     "Usuarios/" +
                        doc.id +
                        "/HorariosLinea/Miercoles/Miercoles1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           miercoles.push(doc.data().hora);
                           miercoles1.push(doc.id);
                        });
                     });

                  db.collection(
                     "Usuarios/" + doc.id + "/HorariosLinea/Jueves/Jueves1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           jueves.push(doc.data().hora);
                           jueves1.push(doc.id);
                        });
                     });

                  db.collection(
                     "Usuarios/" + doc.id + "/HorariosLinea/Viernes/Viernes1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           viernes.push(doc.data().hora);
                           viernes1.push(doc.id);
                        });
                     });

                  db.collection(
                     "Usuarios/" + doc.id + "/HorariosLinea/Sabado/Sabado1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           sabado.push(doc.data().hora);
                           sabado1.push(doc.id);
                        });
                     });

                  db.collection(
                     "Usuarios/" + doc.id + "/HorariosLinea/Domingo/Domingo1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           domingo.push(doc.data().hora);
                           domingo1.push(doc.id);
                        });
                        resultados.innerHTML += `
                <div class="animate__animated animate__fadeIn">
                <img src=${imagenperfil} style="width:13rem"/></br>
                <label>Nombre:Dr.${nombre}</label></br>
                <label>Cedula:${cedula}</label></br>
                <label>Email:${email}</label></br>
                <label>Especialidad:${especialidad}</label></br>
                <label>Costo de la consulta:$${costo}</label></br>
                <label>Descripcion:${descripcion}</label></br>
                <label>Estado:${estadores}</label></br>
                <label>Lunes-${lunesfecha}:</lable>${lunes
                           .map(
                              (val, index) =>
                                 `<a href="/agendarmedico?id=${codijo}&horario=${val}&indice=${lunes1[index]}&dia=Lunes&fecha=${lunesfecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br>
                <label>Martes-${martesfecha}:</lable>${martes
                           .map(
                              (val, index) =>
                                 `<a href="/agendarmedico?id=${codijo}&horario=${val}&indice=${martes1[index]}&dia=Martes&fecha=${martesfecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br>
                <label>Miercoles-${miercolesfecha}:</lable>${miercoles
                           .map(
                              (val, index) =>
                                 `<a href="/agendarmedico?id=${codijo}&horario=${val}&indice=${miercoles1[index]}&dia=Mircoles&fecha=${miercolesfecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br>
                <label>Jueves-${juevesfecha}:</lable>${jueves
                           .map(
                              (val, index) =>
                                 `<a href="/agendarmedico?id=${codijo}&horario=${val}&indice=${jueves1[index]}&dia=Jueves&fecha=${juevesfecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br>
                <label>Viernes-${viernesfecha}:</lable>${viernes
                           .map(
                              (val, index) =>
                                 `<a href="/agendarmedico?id=${codijo}&horario=${val}&indice=${viernes1[index]}&dia=Viernes&fecha=${viernesfecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br>
                <label>Sabado-${sabadofecha}:</lable>${sabado
                           .map(
                              (val, index) =>
                                 `<a href="/agendarmedico?id=${codijo}&horario=${val}&indice=${sabado1[index]}&dia=Sabado&fecha=${sabadofecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br>
                <label>Domingo-${domingofecha}:</lable>${domingo
                           .map(
                              (val, index) =>
                                 `<a href="/agendarmedico?id=${codijo}&horario=${val}&indice=${domingo1[index]}&dia=Domigo&fecha=${domingofecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br>
                 </div>`;
                     });
               });
            });
      } else {
         db.collection("Usuarios")
            .where("Especialidad", "==", especialidad)
            .where("TipoUsuario", "==", "Doctor")
            .where("Estado", "==", estado)
            .onSnapshot((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                  var codijo = doc.id;
                  var nombre1 = doc.data().Nombre;
                  var apellidopaterno = doc.data().ApellidoPaterno;
                  var apellidomaterno = doc.data().ApellidoMaterno;
                  var nombre =
                     nombre1 + " " + apellidopaterno + " " + apellidomaterno;
                  var cedula = doc.data().Cedula;
                  var email = doc.data().Email;
                  var especialidad = doc.data().Especialidad;
                  var descripcion = doc.data().Descripcion;
                  var estadores = doc.data().Estado;
                  var imagenperfil = doc.data().ImagenPerfil;
                  var costo = doc.data().Costoconsulta;
                  var lunes = [];
                  var martes = [];
                  var miercoles = [];
                  var jueves = [];
                  var viernes = [];
                  var sabado = [];
                  var domingo = [];
                  var lunes1 = [];
                  var martes1 = [];
                  var miercoles1 = [];
                  var jueves1 = [];
                  var viernes1 = [];
                  var sabado1 = [];
                  var domingo1 = [];

                  db.collection(
                     "Usuarios/" + doc.id + "/HorariosPresencial/Lunes/Lunes1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           lunes.push(doc.data().hora);
                           lunes1.push(doc.id);
                        });
                     });

                  db.collection(
                     "Usuarios/" + doc.id + "/HorariosPresencial/Martes/Martes1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           martes.push(doc.data().hora);
                           martes1.push(doc.id);
                        });
                     });

                  db.collection(
                     "Usuarios/" +
                        doc.id +
                        "/HorariosPresencial/Miercoles/Miercoles1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           miercoles.push(doc.data().hora);
                           miercoles1.push(doc.id);
                        });
                     });

                  db.collection(
                     "Usuarios/" + doc.id + "/HorariosPresencial/Jueves/Jueves1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           jueves.push(doc.data().hora);
                           jueves1.push(doc.id);
                        });
                     });

                  db.collection(
                     "Usuarios/" +
                        doc.id +
                        "/HorariosPresencial/Viernes/Viernes1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           viernes.push(doc.data().hora);
                           viernes1.push(doc.id);
                        });
                     });

                  db.collection(
                     "Usuarios/" + doc.id + "/HorariosPresencial/Sabado/Sabado1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           sabado.push(doc.data().hora);
                           sabado1.push(doc.id);
                        });
                     });

                  db.collection(
                     "Usuarios/" +
                        doc.id +
                        "/HorariosPresencial/Domingo/Domingo1"
                  )
                     .orderBy("timestamp", "asc")
                     .get()
                     .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                           domingo.push(doc.data().hora);
                           domingo1.push(doc.id);
                        });
                        resultados.innerHTML += `
                <div class="animate__animated animate__fadeIn">
                <div ><img src=${imagenperfil} alt="Foto doctor"style="width:13rem"/></div>
                <label>Nombre:Dr.${nombre}</label></br>
                <label>Cedula:${cedula}</label></br>
                <label>Email:${email}</label></br>
                <label>Especialidad:${especialidad}</label></br>
                <label>Costo de la consulta:$${costo}</label></br>
                <label>Descripcion:${descripcion}</label></br>
                <label>Estado:${estadores}</label></br>
                <label>Lunes-${lunesfecha}:</lable>${lunes
                           .map(
                              (val, index) =>
                                 `<a href="/agendarmedico?id=${codijo}&horario=${val}&indice=${lunes1[index]}&dia=Lunes&fecha=${lunesfecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br>
                <label>Martes-${martesfecha}:</lable>${martes
                           .map(
                              (val, index) =>
                                 `<a href="/agendarmedico?id=${codijo}&horario=${val}&indice=${martes1[index]}&dia=Martes&fecha=${martesfecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br>
                <label>Miercoles-${miercolesfecha}:</lable>${miercoles
                           .map(
                              (val, index) =>
                                 `<a href="/agendarmedico?id=${codijo}&horario=${val}&indice=${miercoles1[index]}&dia=Miercoles&fecha=${miercolesfecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br>
                <label>Jueves-${juevesfecha}:</lable>${jueves
                           .map(
                              (val, index) =>
                                 `<a href="/agendarmedico?id=${codijo}&horario=${val}&indice=${jueves1[index]}&dia=Jueves&fecha=${juevesfecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br>
                <label>Viernes-${viernesfecha}:</lable>${viernes
                           .map(
                              (val, index) =>
                                 `<a href="/agendarmedico?id=${codijo}&horario=${val}&indice=${viernes1[index]}&dia=Viernes&fecha=${viernesfecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br>
                <label>Sabado-${sabadofecha}:</lable>${sabado
                           .map(
                              (val, index) =>
                                 `<a href="/agendarmedico?id=${codijo}&horario=${val}&indice=${sabado1[index]}&dia=Sabado&fecha=${sabadofecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br>
                <label>Domingo-${domingofecha}:</lable>${domingo
                           .map(
                              (val, index) =>
                                 `<a href="/agendarmedico?id=${codijo}&horario=${val}&indice=${domingo1[index]}&dia=Domingo&fecha=${domingofecha}&tipoconsulta=${consultatipo}&costo=${costo}">${val}</a>&nbsp&nbsp&nbsp&nbsp`
                           )
                           .join(" ")}</br>
                           </div>`;
                     });
               });
            });
      }
   }

   opinar() {
      var opinion = document.getElementById("opinar").value;
      if (opinion != "") {
         firebase.auth().onAuthStateChanged((user) => {
            var uid = user.uid;
            db.collection("Usuarios")
               .doc(uid)
               .onSnapshot((doc) => {
                  var imagen = doc.data().ImagenPerfil;
                  var email = doc.data().Email;
                  var nombre =
                     doc.data().Nombre +
                     " " +
                     doc.data().ApellidoPaterno +
                     " " +
                     doc.data().ApellidoMaterno;
                  db.collection("Administrador")
                     .doc("Usuarios")
                     .collection("Opiniones")
                     .add({
                        IdUsuario: uid,
                        Imagenperfil: imagen,
                        Nombre: nombre,
                        Email: email,
                        Opinion: opinion,
                     });
               });
            document.getElementById("opinar").value = "";
         });
      } else {
         alert("El campo no debe estar vacio");
      }
   }

   //html que se muestra en la pagina
   render() {
      return (
         <div onLoad={(this.logeado, this.especialidad, this.estado)}>
            <div className="head">
               <Menu />

               <div>
                  <div className="iconoForm">
                     <img src={img("./medico-header.svg").default} alt="" />
                     <h1 className="tituloForm">Mi Médico Familiar</h1>
                  </div>

                  <div className="form formgrid contenedor">
                     <div>
                        <label>
                           Especialidad:{" "}
                           <i className="ri-contacts-book-fill"></i>
                        </label>
                        <br />
                        <select
                           className="input"
                           id="selectespecialidad"
                        ></select>
                     </div>

                     <div>
                        <label>
                           Estado: <i className="ri-user-location-fill"></i>
                        </label>
                        <br />
                        <select className="input" id="selectestado"></select>
                     </div>

                     <div>
                        <label>
                           Tipo de consulta: <i className="ri-user-fill"></i>
                        </label>
                        <br />
                        <select className="input" id="selecconsultatipo">
                           <option>En linea</option>
                           <option>Presencial</option>
                        </select>
                     </div>
                     <div>
                        <input
                           className="btn-principal seconbtn"
                           type="button"
                           id="comenzar"
                           onClick={this.buscardocores}
                           value="Comenzar"
                        />
                     </div>
                  </div>
               </div>
            </div>

            <div className="contenedor">
               <div id="resultadosbusqueda1" style={{ overflow: "auto" }}></div>
            </div>

            <div>
               <h1 className="titulo">
                  Te ofrecemos <i className="ri-service-fill"></i>
               </h1>
               <ContenedorCard />
            </div>
            <div>
               <ContenedorTestimonial />
            </div>
         </div>
      );
   }
}

export default principalmedico;

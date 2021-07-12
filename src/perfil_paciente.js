import React, { Component } from "react";
import db from "./firebase_config";
import firebase from "firebase/app";
import "firebase/auth";
import MenuLoggedUser from "./Components/Menu/MenuLoggedUser";

class perfil_paciente extends Component {
   //fincion para ejecutar una funcion en cuanto se cargue la pagina
   componentDidMount() {
      this.inicio();
      this.mostraralergias();
      this.eliminaralergias();
      this.mostrarhabitos();
      this.eliminarhabitos();
      this.mostrarpatologicos();
      this.eliminarpatologicos();
      this.mostrarquirurgicos();
      this.eliminarquirurgico();
      this.mostrarvacunas();
      this.eliminarvacunas();
   }

   //si es usuario quiere entrar sin estar logeado esta funcion lo manda al login principal
   inicio() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            db.collection("Usuarios")
               .doc(uid)
               .onSnapshot((doc) => {
                  const apeliidomaterno = doc.data().ApellidoMaterno;
                  const apeliidopaterno = doc.data().ApellidoPaterno;
                  const nombre = doc.data().Nombre;
                  const correo = doc.data().Email;
                  const telefono = doc.data().Telefono;
                  const estado = doc.data().Estado;
                  const nacimiento = doc.data().Fecha;
                  const imagenperfil = doc.data().ImagenPerfil;
                  const peso = doc.data().Peso;
                  const altura = doc.data().Altura;
                  const imc = doc.data().Imc;
                  document.getElementById("nombre").innerText =
                     nombre + " " + apeliidopaterno + " " + apeliidomaterno;
                  document.getElementById("correo").innerText = correo;
                  document.getElementById("telefono").innerText = telefono;
                  document.getElementById("imagenperfil").src = imagenperfil;
                  document.getElementById("peso").innerText = peso;
                  document.getElementById("altura").innerText = altura;
                  document.getElementById("imc").innerText = imc;
                  var convercion = new Date(nacimiento);
                  document.getElementById("nombremodificar").value = nombre;
                  document.getElementById("apellidoPmodificar").value =
                     apeliidopaterno;
                  document.getElementById("apellidoMmodificar").value =
                     apeliidomaterno;
                  document.getElementById("telefonomodificar").value = telefono;
                  document.getElementById("pesomodificar").value = peso;
                  document.getElementById("alturamodificar").value = altura;
                  var hoy = new Date();
                  var edad = hoy.getFullYear() - convercion.getFullYear();
                  document.getElementById("edadPacientes").innerText = edad;
               });
         } else {
            window.location.href = "/";
         }
      });
   }

   //funcion para cerrar sesion firebase te la da por default
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

   editar() {
      document.getElementById("modificar").style.display = "block";
      document.getElementById("datos").style.display = "none";
      document.getElementById("tablas").style.display = "none";
   }

   editar1() {
      var storage = firebase.storage();
      var nombre = document.getElementById("nombremodificar").value;
      var apellidop = document.getElementById("apellidoPmodificar").value;
      var apellidom = document.getElementById("apellidoMmodificar").value;
      var telefono = document.getElementById("telefonomodificar").value;
      var peso = document.getElementById("pesomodificar").value;
      var altura = document.getElementById("alturamodificar").value;
      var imc = peso / altura;
      firebase.auth().onAuthStateChanged((user) => {
         var uid = user.uid;
         var file = document.getElementById("file").files[0];
         console.log(file);
         if (!file) {
            db.collection("Usuarios").doc(uid).update({
               Nombre: nombre,
               ApellidoPaterno: apellidop,
               ApellidoMaterno: apellidom,
               Telefono: telefono,
               Peso: peso,
               Altura: altura,
               Imc: imc,
            });
            document.getElementById("modificar").style.display = "none";
            document.getElementById("datos").style.display = "block";
         } else {
            var storageRef = storage.ref("/userprofileImgs/" + file.name);
            var uploadTask = storageRef.put(file);
            uploadTask.on(
               "satate_chaged",
               function (snapshot) {},
               function (error) {
                  console.log(error);
               },
               function () {
                  var dowloadURL = uploadTask.snapshot.ref
                     .getDownloadURL()
                     .then((url) => {
                        alert(url);
                        db.collection("Usuarios").doc(uid).update({
                           ImagenPerfil: url,
                           Nombre: nombre,
                           ApellidoPaterno: apellidop,
                           ApellidoMaterno: apellidom,
                           Telefono: telefono,
                           Peso: peso,
                           Altura: altura,
                           Imc: imc,
                        });
                     });
               }
            );
         }
      });
      document.getElementById("modificar").style.display = "none";
      document.getElementById("datos").style.display = "block";
      document.getElementById("tablas").style.display = "block";
   }

   alergias() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            var alergia = document.getElementById("alegiasdescripcion").value;
            if (alergia != "") {
               db.collection("Usuarios")
                  .doc(uid)
                  .collection("Alergias")
                  .add({
                     descripcion: alergia,
                  })
                  .then((docRef) => {
                     document.getElementById("alegiasdescripcion").value = "";
                  })
                  .catch((error) => {
                     console.error("Error adding document: ", error);
                     alert(error);
                  });
            } else {
               alert(
                  "Para agregar una alergia el campo no debe de estar vacio"
               );
            }
         } else {
            window.location.href = "/";
         }
      });
   }

   mostraralergias() {
      var vacio = (document.getElementById("alergias").innerText = " ");
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            db.collection("Usuarios/" + uid + "/Alergias").onSnapshot(
               (querySnapshot) => {
                  document.getElementById("alergias").innerText = " ";
                  querySnapshot.forEach((doc) => {
                     var mostraralergias = document.getElementById("alergias");
                     mostraralergias.innerHTML += `
              <table class="tabla">
               <tr>
               <td >${doc.data().descripcion}</td>
               <td><a class="btnBorrar" href="perfil_paciente?id=${
                  doc.id
               }"><i class="ri-close-circle-fill"></i></a></td>
               </tr>
              </table>   
              `;
                  });
               }
            );
         } else {
            window.location.href = "/";
         }
      });
   }

   eliminaralergias() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            var queryString = window.location.search;
            var urlParams = new URLSearchParams(queryString);
            var id = urlParams.get("id");
            if (id != null) {
               db.collection("Usuarios")
                  .doc(uid)
                  .collection("Alergias")
                  .doc(id)
                  .delete()
                  .then(() => {
                     console.log("Document successfully deleted!");
                     window.history.replaceState(
                        {},
                        document.title,
                        "/" + "perfil_paciente"
                     );
                  });
            }
         }
      });
   }

   habitos() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            var habitos = document.getElementById("habitosdescripcion").value;
            if (habitos != "") {
               db.collection("Usuarios")
                  .doc(uid)
                  .collection("Habitos")
                  .add({
                     descripcion: habitos,
                  })
                  .then((docRef) => {
                     document.getElementById("habitosdescripcion").value = "";
                  })
                  .catch((error) => {
                     console.error("Error adding document: ", error);
                     alert(error);
                  });
            } else {
               alert("Para agregar un habito el campo no debe de estar vacio");
            }
         } else {
            window.location.href = "/";
         }
      });
   }

   mostrarhabitos() {
      var vacio = (document.getElementById("habitos").innerText = " ");
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            db.collection("Usuarios/" + uid + "/Habitos").onSnapshot(
               (querySnapshot) => {
                  document.getElementById("habitos").innerText = " ";
                  querySnapshot.forEach((doc) => {
                     var mostrarhabitos = document.getElementById("habitos");
                     mostrarhabitos.innerHTML += `
              <table class="tabla" >
               <tr>
               <td >${doc.data().descripcion}</td>
               <td><a class="btnBorrar" href="perfil_paciente?idhabito=${
                  doc.id
               }"><i class="ri-close-circle-fill"></i></a></td>
               </tr>
              </table>   
              `;
                  });
               }
            );
         } else {
            window.location.href = "/";
         }
      });
   }
   eliminarhabitos() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            var queryString = window.location.search;
            var urlParams = new URLSearchParams(queryString);
            var id = urlParams.get("idhabito");
            if (id != null) {
               db.collection("Usuarios")
                  .doc(uid)
                  .collection("Habitos")
                  .doc(id)
                  .delete()
                  .then(() => {
                     console.log("Document successfully deleted!");
                     window.history.replaceState(
                        {},
                        document.title,
                        "/" + "perfil_paciente"
                     );
                  });
            }
         }
      });
   }

   patologicos() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            var patologicos = document.getElementById(
               "patologicosdescripcion"
            ).value;
            if (patologicos != "") {
               db.collection("Usuarios")
                  .doc(uid)
                  .collection("Patologicos")
                  .add({
                     descripcion: patologicos,
                  })
                  .then((docRef) => {
                     document.getElementById("patologicosdescripcion").value =
                        "";
                  })
                  .catch((error) => {
                     console.error("Error adding document: ", error);
                     alert(error);
                  });
            } else {
               alert(
                  "Para agregar un antecedente Patologico el campo no debe de estar vacio"
               );
            }
         } else {
            window.location.href = "/";
         }
      });
   }

   mostrarpatologicos() {
      var vacio = (document.getElementById("patologicos").innerText = " ");
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            db.collection("Usuarios/" + uid + "/Patologicos").onSnapshot(
               (querySnapshot) => {
                  document.getElementById("patologicos").innerText = " ";
                  querySnapshot.forEach((doc) => {
                     var mostrarpatologicos =
                        document.getElementById("patologicos");
                     mostrarpatologicos.innerHTML += `
              <table class="tabla" >
               <tr>
               <td >${doc.data().descripcion}</td>
               <td><a class="btnBorrar" href="perfil_paciente?idpatologico=${
                  doc.id
               }"><i class="ri-close-circle-fill"></i></a></td>
               </tr>
              </table>   
              `;
                  });
               }
            );
         } else {
            window.location.href = "/";
         }
      });
   }

   eliminarpatologicos() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            var queryString = window.location.search;
            var urlParams = new URLSearchParams(queryString);
            var id = urlParams.get("idpatologico");
            if (id != null) {
               db.collection("Usuarios")
                  .doc(uid)
                  .collection("Patologicos")
                  .doc(id)
                  .delete()
                  .then(() => {
                     console.log("Document successfully deleted!");
                     window.history.replaceState(
                        {},
                        document.title,
                        "/" + "perfil_paciente"
                     );
                  });
            }
         }
      });
   }

   quirurgicos() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            var quirurgicos = document.getElementById(
               "quirurgicosdescripcion"
            ).value;
            if (quirurgicos != "") {
               db.collection("Usuarios")
                  .doc(uid)
                  .collection("Quirurgicos")
                  .add({
                     descripcion: quirurgicos,
                  })
                  .then((docRef) => {
                     document.getElementById("quirurgicosdescripcion").value =
                        "";
                  })
                  .catch((error) => {
                     console.error("Error adding document: ", error);
                     alert(error);
                  });
            } else {
               alert(
                  "Para agregar un antecedente Quirurgico el campo no debe de estar vacio"
               );
            }
         } else {
            window.location.href = "/";
         }
      });
   }

   mostrarquirurgicos() {
      var vacio = (document.getElementById("quirurgicos").innerText = " ");
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            db.collection("Usuarios/" + uid + "/Quirurgicos").onSnapshot(
               (querySnapshot) => {
                  document.getElementById("quirurgicos").innerText = " ";
                  querySnapshot.forEach((doc) => {
                     var mostrarpatologicos =
                        document.getElementById("quirurgicos");
                     mostrarpatologicos.innerHTML += `
              <table class="tabla" >
               <tr>
               <td >${doc.data().descripcion}</td>
               <td><a class="btnBorrar" href="perfil_paciente?idquirurgico=${
                  doc.id
               }"><i class="ri-close-circle-fill"></i></a></td>
               </tr>
              </table>   
              `;
                  });
               }
            );
         } else {
            window.location.href = "/";
         }
      });
   }

   eliminarquirurgico() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            var queryString = window.location.search;
            var urlParams = new URLSearchParams(queryString);
            var id = urlParams.get("idquirurgico");
            if (id != null) {
               db.collection("Usuarios")
                  .doc(uid)
                  .collection("Quirurgicos")
                  .doc(id)
                  .delete()
                  .then(() => {
                     console.log("Document successfully deleted!");
                     window.history.replaceState(
                        {},
                        document.title,
                        "/" + "perfil_paciente"
                     );
                  });
            }
         }
      });
   }

   vacunas() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            var vacunas = document.getElementById("vacunasdescripcion").value;
            if (vacunas != "") {
               db.collection("Usuarios")
                  .doc(uid)
                  .collection("Vacunas")
                  .add({
                     descripcion: vacunas,
                  })
                  .then((docRef) => {
                     document.getElementById("vacunasdescripcion").value = "";
                  })
                  .catch((error) => {
                     console.error("Error adding document: ", error);
                     alert(error);
                  });
            } else {
               alert("Para agregar una Vacuna el campo no debe de estar vacio");
            }
         } else {
            window.location.href = "/";
         }
      });
   }

   mostrarvacunas() {
      var vacio = (document.getElementById("vacunas").innerText = " ");
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            db.collection("Usuarios/" + uid + "/Vacunas").onSnapshot(
               (querySnapshot) => {
                  document.getElementById("vacunas").innerText = " ";
                  querySnapshot.forEach((doc) => {
                     var mostrarvacunas = document.getElementById("vacunas");
                     mostrarvacunas.innerHTML += `
              <table class="tabla">
               <tr>
               <td >${doc.data().descripcion}</td>
               <td><a class="btnBorrar" href="perfil_paciente?idvacunas=${
                  doc.id
               }"><i class="ri-close-circle-fill"></i></a></td>
               </tr>
              </table>   
              `;
                  });
               }
            );
         } else {
            window.location.href = "/";
         }
      });
   }

   eliminarvacunas() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            var uid = user.uid;
            var queryString = window.location.search;
            var urlParams = new URLSearchParams(queryString);
            var id = urlParams.get("idvacunas");
            if (id != null) {
               db.collection("Usuarios")
                  .doc(uid)
                  .collection("Vacunas")
                  .doc(id)
                  .delete()
                  .then(() => {
                     console.log("Document successfully deleted!");
                     window.history.replaceState(
                        {},
                        document.title,
                        "/" + "perfil_paciente"
                     );
                  });
            }
         }
      });
   }

   render() {
      return (
         <div onload={this.inicio}>
            <div className="App" id="datos">
               <MenuLoggedUser cerrar_sesion={this.cerrar_sesion} />
               <br />
               <h1 className="titulo">
                  Mi perfil <i className="ri-user-heart-fill"></i>
               </h1>

               <div className="contenedor contentBlanco">
                  <div className="marcoFoto">
                     <img
                        src=""
                        style={{
                           borderRadius: "50%",
                           width: "100%",
                           height: "100%",
                        }}
                        id="imagenperfil"
                     />
                  </div>
                  <br />
                  <div className="variables">
                     <label className="tituloTabla">
                        Nombre <i className="ri-user-heart-fill"></i>
                     </label>
                     <label id="nombre"></label>
                     <br />
                     <label className="tituloTabla">
                        Correo <i className="ri-mail-fill"></i>
                     </label>
                     <label id="correo"></label>
                     <br />
                     <label className="tituloTabla">
                        Telefono <i className="ri-phone-fill"></i>
                     </label>
                     <label id="telefono"></label>
                     <br />
                  </div>
                  <div className="Salud">
                     <div className="itemSalud">
                        <label>IMC:</label> <label id="imc"></label>
                     </div>
                     <div className="itemSalud">
                        <label>Edad:</label> <label id="edadPacientes"></label>
                     </div>
                     <div className="itemSalud">
                        <label>Peso:</label> <label id="peso"></label>
                     </div>
                     <div className="itemSalud">
                        <label>Altura:</label> <label id="altura"></label>
                     </div>
                  </div>
                  <button
                     className="btn-principal seconbtn"
                     onClick={this.editar}
                  >
                     Editar
                  </button>
               </div>
            </div>
            <div className="contenedor " id="tablas">
               <h1 className="titulo">
                  Variables de Salud <i className="ri-capsule-fill"></i>
               </h1>

               <div className="contentApricot gridTabla ">
                  <div
                     style={{ margin: "1rem auto" }}
                     className="contentBlanco"
                  >
                     <div className="divItemTabla">
                        <label className="tituloInputTabla">Alergias</label>
                        <br />
                        <input className="input" id="alegiasdescripcion" />
                        <br />
                        <button onClick={this.alergias} className="btnAgregar">
                           <i className="ri-add-line"></i>Agregar
                        </button>
                     </div>
                     <br />
                     <label className="tituloTabla">Lista de Alergias</label>
                     <div id="alergias"></div>
                     <br />
                  </div>

                  <div
                     style={{ margin: "1rem auto" }}
                     className="contentBlanco"
                  >
                     <div className="divItemTabla">
                        <label className="tituloInputTabla">
                           Habitos y Estilo de vida
                        </label>
                        <br />
                        <input className="input" id="habitosdescripcion" />
                        <br />
                        <button onClick={this.habitos} className="btnAgregar">
                           <i className="ri-add-line"></i>Agregar
                        </button>
                     </div>
                     <br />
                     <label className="tituloTabla">
                        Lista de Habitos y Estilo de vida
                     </label>
                     <div id="habitos"></div>
                     <br />
                  </div>

                  <div
                     style={{ margin: "1rem auto" }}
                     className="contentBlanco"
                  >
                     <div className="divItemTabla">
                        <label className="tituloInputTabla">
                           Antecedentes Patologicos
                        </label>
                        <br />
                        <input className="input" id="patologicosdescripcion" />
                        <br />
                        <button
                           onClick={this.patologicos}
                           className="btnAgregar"
                        >
                           <i className="ri-add-line"></i>Agregar
                        </button>
                     </div>
                     <br />
                     <label className="tituloTabla">
                        Lista de antecedente Patologicos
                     </label>
                     <div id="patologicos"></div>
                     <br />
                  </div>

                  <div
                     style={{ margin: "1rem auto" }}
                     className="contentBlanco"
                  >
                     <div className="divItemTabla">
                        <label className="tituloInputTabla">
                           Antecedentes Quirurgicos
                        </label>
                        <br />
                        <input className="input" id="quirurgicosdescripcion" />
                        <br />
                        <button
                           onClick={this.quirurgicos}
                           className="btnAgregar"
                        >
                           <i className="ri-add-line"></i>Agregar
                        </button>
                     </div>

                     <br />
                     <label className="tituloTabla">
                        Lista de antecedentes Quirurgicos
                     </label>
                     <div id="quirurgicos"></div>
                     <br />
                  </div>
                  <div
                     style={{ margin: "1rem auto" }}
                     className="contentBlanco"
                  >
                     <div className="divItemTabla">
                        <label className="tituloInputTabla">Vacunas</label>
                        <br />
                        <input className="input" id="vacunasdescripcion" />
                        <br />
                        <button onClick={this.vacunas} className="btnAgregar">
                           <i className="ri-add-line"></i>Agregar
                        </button>
                     </div>

                     <br />
                     <label className="tituloTabla">Lista de Vacunas</label>
                     <div id="vacunas"></div>
                     <br />
                  </div>
               </div>
            </div>

            <div style={{ display: "none" }} id="modificar">
               <h1 className="titulo">
                  Modifica los valores de tu perfil
                  <i className="ri-capsule-fill"></i>
               </h1>

               <div className="contentModificar contentBlanco">
                  <label className="tituloTabla">Agrega imagen de perfil</label>

                  <input type="file" id="file" />

                  <label className="tituloTabla">Nombres</label>

                  <input className="input" type="text" id="nombremodificar" />

                  <label className="tituloTabla">Apellido Paterno</label>

                  <input
                     className="input"
                     type="text"
                     id="apellidoPmodificar"
                  />

                  <label className="tituloTabla">Apellido Materno</label>

                  <input
                     className="input"
                     type="text"
                     id="apellidoMmodificar"
                  />

                  <label className="tituloTabla">Telefono</label>

                  <input className="input" type="text" id="telefonomodificar" />

                  <label className="tituloTabla">Peso</label>

                  <input className="input" type="text" id="pesomodificar" />

                  <label className="tituloTabla">Altura</label>

                  <input className="input" type="text" id="alturamodificar" />

                  <button
                     className="btn-principal seconbtn"
                     onClick={this.editar1}
                  >
                     Modificar
                  </button>
               </div>
            </div>
         </div>
      );
   }
}

export default perfil_paciente;

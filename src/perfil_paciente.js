
import React, { Component } from 'react';
import db from './firebase_config'
import firebase from 'firebase/app';
import "firebase/auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  onload
} from "react-router-dom";




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
        db.collection("Usuarios").doc(uid)
          .onSnapshot((doc) => {
            console.log("Current data: ", doc.data());
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
            document.getElementById("nombre").innerText = nombre + " " + apeliidopaterno + " " + apeliidomaterno;
            document.getElementById("correo").innerText = correo;
            document.getElementById("telefono").innerText = telefono;
            document.getElementById("imagenperfil").src = imagenperfil;
            document.getElementById("peso").innerText =peso;
            document.getElementById("altura").innerText =altura;
            document.getElementById("imc").innerText =imc;
            var convercion = new Date(nacimiento);
            document.getElementById("nombremodificar").value = nombre;
            document.getElementById("apellidoPmodificar").value = apeliidopaterno;
            document.getElementById("apellidoMmodificar").value = apeliidomaterno;
            document.getElementById("telefonomodificar").value = telefono;
            document.getElementById("pesomodificar").value =peso;
            document.getElementById("alturamodificar").value =altura;
            var hoy = new Date();
            var edad = (hoy.getFullYear() - convercion.getFullYear());
            document.getElementById("edadPacientes").innerText = edad;
          });



      } else {
        window.location.href = "/";

      }

    });
  }


  //funcion para cerrar sesion firebase te la da por default
  cerrar_sesion() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      alert("La sesion se a cerrado")
      window.location.href = "/";
    }).catch((error) => {
      // An error happened.
    });
  }

  editar() 
  {
    document.getElementById('modificar').style.display="block";
    document.getElementById('datos').style.display="none";
    document.getElementById('tablas').style.display="none";
   

  }


  editar1()
  {
    var storage = firebase.storage();
    var nombre=document.getElementById('nombremodificar').value;
    var apellidop=document.getElementById('apellidoPmodificar').value;
    var apellidom=document.getElementById('apellidoMmodificar').value;
    var telefono=document.getElementById('telefonomodificar').value;
    var peso=document.getElementById('pesomodificar').value;
    var altura=document.getElementById('alturamodificar').value;
    var imc=peso/altura;
    firebase.auth().onAuthStateChanged((user) => {
      var uid = user.uid;
      var file = document.getElementById('file').files[0];
      console.log(file)
      if (!file) {
        console.log("esta vacio ");
        db.collection("Usuarios").doc(uid).update({
          Nombre:nombre,
          ApellidoPaterno:apellidop,
          ApellidoMaterno:apellidom,
          Telefono:telefono,
          Peso:peso,
          Altura:altura,
          Imc:imc

        });
        document.getElementById('modificar').style.display="none";
    document.getElementById('datos').style.display="block";
    

      } else {
        var storageRef = storage.ref('/userprofileImgs/' + file.name);
        var uploadTask = storageRef.put(file);
        uploadTask.on('satate_chaged', function (snapshot) {

        }, function (error) {
          console.log(error)
        }, function () {
          console.log("Archivo o imagen arriba");
          var dowloadURL = uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            alert(url);
            db.collection("Usuarios").doc(uid).update({
              ImagenPerfil: url,
              Nombre:nombre,
              ApellidoPaterno:apellidop,
              ApellidoMaterno:apellidom,
              Telefono:telefono,
              Peso:peso,
              Altura:altura,
              Imc:imc

            });
          })
        });

      }
    });
    document.getElementById('modificar').style.display="none";
    document.getElementById('datos').style.display="block";
    document.getElementById('tablas').style.display="block";
    
    
  }

  alergias()
  {
     firebase.auth().onAuthStateChanged((user) => {
      if (user) 
      {
            var uid = user.uid;
            var alergia=document.getElementById('alegiasdescripcion').value;
            if(alergia!="")
            {
               db.collection("Usuarios").doc(uid).collection("Alergias").add({
               descripcion:alergia,
            
              })
                .then((docRef) => {
                  document.getElementById('alegiasdescripcion').value="";
                })
                .catch((error) => {
                  console.error("Error adding document: ", error);
                  alert(error);
                });

            }else
            {
              alert("Para agregar una alergia el campo no debe de estar vacio");
            }
            

      }else
      {
        window.location.href = "/";

      }
     })

  }


  mostraralergias()
  {

    var vacio=document.getElementById('alergias').innerText=" ";
      firebase.auth().onAuthStateChanged((user) => {
      if (user) 
      {
        var uid = user.uid;
        db.collection("Usuarios/"+uid+"/Alergias").onSnapshot((querySnapshot) => {
          document.getElementById('alergias').innerText=" ";
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        var mostraralergias=document.getElementById('alergias');        
        mostraralergias.innerHTML +=
              `
              <table border="1px solid">
               <tr>
               <td >${doc.data().descripcion}</td>
               <td><a href="perfil_paciente?id=${doc.id}">Eliminar</a></td>
               </tr>
              </table>   
              `

        });
        });
      }else
      {
        window.location.href = "/";

      }
      })
            

  }

  eliminaralergias()
  {

     firebase.auth().onAuthStateChanged((user) => {
      if (user) 
      {
        var uid = user.uid;
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var id = urlParams.get('id');
        if (id != null) 
        {
           db.collection("Usuarios").doc(uid).collection('Alergias').doc(id).delete().then(() => {
           console.log("Document successfully deleted!");
           window.history.replaceState({}, document.title, "/" + "perfil_paciente");
           })
        }
      }
     })
  }

  
  habitos()
  {
     firebase.auth().onAuthStateChanged((user) => {
      if (user) 
      {
            var uid = user.uid;
            var habitos=document.getElementById('habitosdescripcion').value;
            if(habitos!="")
            {
               db.collection("Usuarios").doc(uid).collection("Habitos").add({
               descripcion:habitos,
            
              })
                .then((docRef) => {
                  document.getElementById('habitosdescripcion').value="";
                })
                .catch((error) => {
                  console.error("Error adding document: ", error);
                  alert(error);
                });

            }else
            {
              alert("Para agregar un habito el campo no debe de estar vacio");
            }
            

      }else
      {
        window.location.href = "/";

      }
     })

  }

  
  mostrarhabitos()
  {

    var vacio=document.getElementById('habitos').innerText=" ";
      firebase.auth().onAuthStateChanged((user) => {
      if (user) 
      {
        var uid = user.uid;
        db.collection("Usuarios/"+uid+"/Habitos").onSnapshot((querySnapshot) => {
          document.getElementById('habitos').innerText=" ";
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        var mostrarhabitos=document.getElementById('habitos');        
        mostrarhabitos.innerHTML +=
              `
              <table border="1px solid">
               <tr>
               <td >${doc.data().descripcion}</td>
               <td><a href="perfil_paciente?idhabito=${doc.id}">Eliminar</a></td>
               </tr>
              </table>   
              `

        });
        });
      }else
      {
        window.location.href = "/";

      }
      })
            

  }
   eliminarhabitos()
  {

     firebase.auth().onAuthStateChanged((user) => {
      if (user) 
      {
        var uid = user.uid;
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var id = urlParams.get('idhabito');
        if (id != null) 
        {
           db.collection("Usuarios").doc(uid).collection('Habitos').doc(id).delete().then(() => {
           console.log("Document successfully deleted!");
           window.history.replaceState({}, document.title, "/" + "perfil_paciente");
           })
        }
      }
     })
  }

   patologicos()
  {
     firebase.auth().onAuthStateChanged((user) => {
      if (user) 
      {
            var uid = user.uid;
            var patologicos=document.getElementById('patologicosdescripcion').value;
            if(patologicos!="")
            {
               db.collection("Usuarios").doc(uid).collection("Patologicos").add({
               descripcion:patologicos,
            
              })
                .then((docRef) => {
                  document.getElementById('patologicosdescripcion').value="";
                })
                .catch((error) => {
                  console.error("Error adding document: ", error);
                  alert(error);
                });

            }else
            {
              alert("Para agregar un antecedente Patologico el campo no debe de estar vacio");
            }
            

      }else
      {
        window.location.href = "/";

      }
     })

  }

  
  
  mostrarpatologicos()
  {

    var vacio=document.getElementById('patologicos').innerText=" ";
      firebase.auth().onAuthStateChanged((user) => {
      if (user) 
      {
        var uid = user.uid;
        db.collection("Usuarios/"+uid+"/Patologicos").onSnapshot((querySnapshot) => {
          document.getElementById('patologicos').innerText=" ";
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        var mostrarpatologicos=document.getElementById('patologicos');        
        mostrarpatologicos.innerHTML +=
              `
              <table border="1px solid">
               <tr>
               <td >${doc.data().descripcion}</td>
               <td><a href="perfil_paciente?idpatologico=${doc.id}">Eliminar</a></td>
               </tr>
              </table>   
              `

        });
        });
      }else
      {
        window.location.href = "/";

      }
      })
            

  }

    eliminarpatologicos()
  {

     firebase.auth().onAuthStateChanged((user) => {
      if (user) 
      {
        var uid = user.uid;
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var id = urlParams.get('idpatologico');
        if (id != null) 
        {
           db.collection("Usuarios").doc(uid).collection('Patologicos').doc(id).delete().then(() => {
           console.log("Document successfully deleted!");
           window.history.replaceState({}, document.title, "/" + "perfil_paciente");
           })
        }
      }
     })
  }

    quirurgicos()
  {
     firebase.auth().onAuthStateChanged((user) => {
      if (user) 
      {
            var uid = user.uid;
            var quirurgicos=document.getElementById('quirurgicosdescripcion').value;
            if(quirurgicos!="")
            {
               db.collection("Usuarios").doc(uid).collection("Quirurgicos").add({
               descripcion:quirurgicos,
            
              })
                .then((docRef) => {
                  document.getElementById('quirurgicosdescripcion').value="";
                })
                .catch((error) => {
                  console.error("Error adding document: ", error);
                  alert(error);
                });

            }else
            {
              alert("Para agregar un antecedente Quirurgico el campo no debe de estar vacio");
            }
            

      }else
      {
        window.location.href = "/";

      }
     })

  }

   mostrarquirurgicos()
  {

    var vacio=document.getElementById('quirurgicos').innerText=" ";
      firebase.auth().onAuthStateChanged((user) => {
      if (user) 
      {
        var uid = user.uid;
        db.collection("Usuarios/"+uid+"/Quirurgicos").onSnapshot((querySnapshot) => {
          document.getElementById('quirurgicos').innerText=" ";
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        var mostrarpatologicos=document.getElementById('quirurgicos');        
        mostrarpatologicos.innerHTML +=
              `
              <table border="1px solid">
               <tr>
               <td >${doc.data().descripcion}</td>
               <td><a href="perfil_paciente?idquirurgico=${doc.id}">Eliminar</a></td>
               </tr>
              </table>   
              `

        });
        });
      }else
      {
        window.location.href = "/";

      }
      })
  }

  eliminarquirurgico()
  {

     firebase.auth().onAuthStateChanged((user) => {
      if (user) 
      {
        var uid = user.uid;
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var id = urlParams.get('idquirurgico');
        if (id != null) 
        {
           db.collection("Usuarios").doc(uid).collection('Quirurgicos').doc(id).delete().then(() => {
           console.log("Document successfully deleted!");
           window.history.replaceState({}, document.title, "/" + "perfil_paciente");
           })
        }
      }
     })
  }

  vacunas()
  {
     firebase.auth().onAuthStateChanged((user) => {
      if (user) 
      {
            var uid = user.uid;
            var vacunas=document.getElementById('vacunasdescripcion').value;
            if(vacunas!="")
            {
               db.collection("Usuarios").doc(uid).collection("Vacunas").add({
               descripcion:vacunas,
            
              })
                .then((docRef) => {
                  document.getElementById('vacunasdescripcion').value="";
                })
                .catch((error) => {
                  console.error("Error adding document: ", error);
                  alert(error);
                });

            }else
            {
              alert("Para agregar una Vacuna el campo no debe de estar vacio");
            }
            

      }else
      {
        window.location.href = "/";

      }
     })

  }

     mostrarvacunas()
  {

    var vacio=document.getElementById('vacunas').innerText=" ";
      firebase.auth().onAuthStateChanged((user) => {
      if (user) 
      {
        var uid = user.uid;
        db.collection("Usuarios/"+uid+"/Vacunas").onSnapshot((querySnapshot) => {
          document.getElementById('vacunas').innerText=" ";
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        var mostrarvacunas=document.getElementById('vacunas');        
        mostrarvacunas.innerHTML +=
              `
              <table border="1px solid">
               <tr>
               <td >${doc.data().descripcion}</td>
               <td><a href="perfil_paciente?idvacunas=${doc.id}">Eliminar</a></td>
               </tr>
              </table>   
              `

        });
        });
      }else
      {
        window.location.href = "/";

      }
      })
  }

  eliminarvacunas()
  {

     firebase.auth().onAuthStateChanged((user) => {
      if (user) 
      {
        var uid = user.uid;
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var id = urlParams.get('idvacunas');
        if (id != null) 
        {
           db.collection("Usuarios").doc(uid).collection('Vacunas').doc(id).delete().then(() => {
           console.log("Document successfully deleted!");
           window.history.replaceState({}, document.title, "/" + "perfil_paciente");
           })
        }
      }
     })
  }







  //html que se muestra en la pagina 
  render() {
    return (
      <div onload={this.inicio}>
        <div className="App" id="datos">
          <a href="/principal">Principal</a><br/>
          <a href="/citaspaciente">Citas</a><br/>
          <a href="" onClick={this.cerrar_sesion}>Cerrar Sesion</a><br/><br/>
          <h1>Perfil Paciente</h1>
          <img src="" style={{ width: 10 + '%', height: 150 + 'px' }} id="imagenperfil" /><br/>
          <label>Nombre:</label><label id="nombre"></label><br/>
          <label>Correo:</label> <label id="correo"></label><br/>
          <label>Telefono:</label><label id="telefono"></label><br/>
          <label>IMC:</label>  <label id="imc"></label><br/>
          <label>Edad:</label>  <label id="edadPacientes"></label><br/>
          <label>Peso:</label>  <label id="peso"></label><br/>
          <label>Altura:</label>  <label id="altura"></label><br/>
          <input type="button" id="" onClick={this.editar} value="Editar"></input><br /><br/>
        </div>
        <div id="tablas">
          <label>Alergias</label><br/>
          <textarea id="alegiasdescripcion"></textarea><br/><input type="button" onClick={this.alergias} value="Agregar"/><br/>
          <label>Tabla de Alergias</label>
          <div id="alergias"></div><br/>
          <label>Habitos y Estilo de vida</label><br/>
          <textarea id="habitosdescripcion"></textarea><br/><input type="button" onClick={this.habitos} value="Agregar"/><br/>
          <label>Tabla de Habitos y Estilo de vida</label>
          <div id="habitos"></div><br/>
          <label>Antecedentes Patologicos</label><br/>
          <textarea id="patologicosdescripcion"></textarea><br/><input type="button" onClick={this.patologicos} value="Agregar"/><br/>
          <label>Tabla de antecedente Patologicos</label>
          <div id="patologicos"></div><br/>
          <label>Antecedentes Quirurgicos</label><br/>
          <textarea id="quirurgicosdescripcion"></textarea><br/><input type="button" onClick={this.quirurgicos} value="Agregar"/><br/>
          <label>Tabla de antecedentes Quirurgicos</label>
          <div id="quirurgicos"></div><br/>
          <label>Vacunas</label><br/>
          <textarea id="vacunasdescripcion"></textarea><br/><input type="button" onClick={this.vacunas} value="Agregar"/><br/>
          <label>Tabla de Vacunas</label>
          <div id="vacunas"></div><br/>
        </div>


        <div style={{display:'none'}} id="modificar">
          <label>Agrega imagen de perfil</label><br/>
          <input type="file" id="file"></input><br/>
          <label>Nombres</label><br/><input type="text" id="nombremodificar"></input><br/>
          <label>Apellido Paterno</label><br/><input type="text" id="apellidoPmodificar"></input><br/>
          <label>Apellido Materno</label><br/><input type="text" id="apellidoMmodificar"></input><br/>
          <label>Telefono</label><br/><input type="text" id="telefonomodificar"></input><br/>
          <label>Peso</label><br/><input type="text" id="pesomodificar"></input><br/>
          <label>Altura</label><br/><input type="text" id="alturamodificar"></input><br/>
          <input type="button" value="Modificar" onClick={this.editar1}></input>

        </div>

        
      </div>
    );
  }
}

export default perfil_paciente;
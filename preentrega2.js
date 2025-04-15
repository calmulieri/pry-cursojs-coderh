/* Pre entrega nº2 */
/* a partir de la idea de la preentrega 1 - simular un alta y listado de clientes */
/* intentamos ahora realizar la caraga a partiir de un formulario y botones  */
/* guardando la información en el local storage*/

/* Bloque de definición de variables y objetos */
/* defino clase para clientes */
class cliente {
    constructor(codi, apyn) {
        this.codi = codi;
        this.apyn = apyn;
    }
}
/* defino array de clientes */
let arrayClientes = []   // Este array contendrá los datos codigo y nombre
/* Defino constantes del formulario */
const formulario = document.getElementById("formulario");
const tablaClientes = document.getElementById("tablaClientes");
const tablaBody = document.querySelector("#tablaClientes tbody");
const boton = document.getElementById("boton");
const codigo = document.getElementById("codigo")
const nombre = document.getElementById("nombre")
const ingresados = document.getElementById("ingresados")
let apynCli = ""; // variable de trabajo
let codCli = 0;   // variable de trabajo
let zerror = 0;   // utilizado para indicar errores en inputs

/* defino funciones */
/* funcion para validar el ingreso de los datos */
function alta() {
    zerror = 0
    if (apynCli === "") {
        zerror = 3 /* marca que hubo error */
    }
    if (isNaN(codCli) || codCli <= 0) {
        zerror = 1 /* marca que hubo error */
    }
    else {
        for (let i = 0; i < arrayClientes.length; i++) {
            if (codCli == arrayClientes[i].codi) {
                zerror = 2 /* marca que hubo error */
            }
        }
    }
    return
}
/* Funcion para subir el array al storage*/
function subeArray() {
    localStorage.setItem("clientes", JSON.stringify(arrayClientes));
    return
}
/* Funcion para bajar el storage al array*/
function bajastorage() {
    if (arrayClientes.length === 0) {
        arrayClientes = JSON.parse(localStorage.getItem("clientes")) || [];
        tablaBody.innerHTML = "";               //Vacía el body de la tabla html
        completaTabla()

    }
    return
}
/* Recorre el array y completa la tabla html masivamente */
function completaTabla() {
    for (let i = 0; i < arrayClientes.length; i++) {
        agregafila(arrayClientes[i].codi, arrayClientes[i].apyn);
    }
    return
}
/* funcion para agregar la fila y columnas a la tabla en el html*/
function agregafila(cliente, apyn) {
    const fila = document.createElement("tr");      //Creo fila    
    const celdaCod = document.createElement("td");  //Creo celda
    celdaCod.textContent = `${cliente}`;            
    fila.appendChild(celdaCod);                     //Inserto celda
    const celdaApyn = document.createElement("td"); //Creo celda 2
    celdaApyn.textContent = `${apyn}`;              
    fila.appendChild(celdaApyn);                    //Inserto celda 2
    tablaBody.appendChild(fila);                    //Inserto fila

    return
}
/*defino Eventos*/
/* escucha si se carga el formulario html */
addEventListener("DOMContentLoaded", function () {
    bajastorage(); // 
})

formulario.addEventListener("submit", (event) => {
    // evita el reset
    event.preventDefault();
    /* transfiero valores del formulario a las viariables de trabajo*/
    codCli = codigo.value;
    apynCli = nombre.value;
    alta();
    if (zerror === 0) {
        const nuevocliente = new cliente(codCli, apynCli);  // nueva instancia de cliente
        arrayClientes.push(nuevocliente);   // agrega cliente al array
        subeArray();    // sube el array al storage
        agregafila(codCli, apynCli);
    }
    else {
        if (zerror === 1) {
            alert("Debe ser un valor numerico entero y positivo");
        }
        else {
            if (zerror === 2) {
                alert("No pueden repetirse codigos");
            }
            else {
                if (zerror === 3) {
                    alert("El nombre no puede estar en blanco o vacío");
                }

            }
        }
    }
})









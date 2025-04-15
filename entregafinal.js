/* Entrega final  */
/* a partir de la idea de la preentrega 2 completamos el simulador de altas, modificaciones y listado de clientes */
/* intentamos ahora mejorar el formulario de entrada - incorporar funcionalidad  - uso de fetch */
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
let cualFuncion = "A"    // Variable que indica la función de la transacción A=Alta - M=Modifica - B=Baja - A es default
let cualmodifico = -1    // variable que contendrá el indice de la tabla a modificar o dar de baja
/* Defino constantes del formulario */
const formulario = document.getElementById("formulario");
const tablaClientes = document.getElementById("tablaClientes");
const tablaBody = document.querySelector("#tablaClientes tbody");
const filas = tablaBody.querySelectorAll("tr");
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
/* Funcion valida entrada de datos */
function valida() {
    errorEntrada = 0
    if (apynCli === "") {
        errorEntrada = 3 /* entrada vacia */
    }
    if (isNaN(codCli) || codCli <= 0) {
        errorEntrada = 1 /* entrada nula o cero */
    }
    else {
        for (let i = 0; i < arrayClientes.length; i++) {
            if (codCli == arrayClientes[i].codi) {
                errorEntrada = 2 /* Codigo ya existe */
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
/* Recorre el array y completa la tabla html masivamente */
function completaTabla() {
    for (let i = 0; i < arrayClientes.length; i++) {
        agregafila(arrayClientes[i].codi, arrayClientes[i].apyn);
    }
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

/*defino Eventos*/
/* escucha si se carga el formulario html */
addEventListener("DOMContentLoaded", function () {
    bajastorage(); // 
})
/* Escucha el evento click en el boton del formulario de clientes */
formulario.addEventListener("submit", (event) => {
    // evita el reset
    event.preventDefault();
    // transfiero valores del formulario a las viariables de trabajo
    codCli = codigo.value;
    apynCli = nombre.value;
    valida(); /* Valido entrada de datos */
    // Determino si vengo por Alta, Modificacion o Baja a partir del valor de la variable cualfuncion
    switch (cualFuncion) {
        case "A":
            // Código para Alta
            if (errorEntrada === 0) {
                /** todo ok damos alta **/
                const nuevocliente = new cliente(codCli, apynCli);  // nueva instancia de cliente
                arrayClientes.push(nuevocliente);   // agrega cliente al array
                
                subeArray();    // sube el array al storage
                agregafila(codCli, apynCli);
            }
            else {
                if (errorEntrada === 1) {
                    alert("Debe ser un valor numerico entero y positivo");
                }
                else {
                    if (errorEntrada === 2) {
                        alert("No pueden repetirse codigos");
                    }
                    else {
                        if (errorEntrada === 3) {
                            alert("El nombre no puede estar en blanco o vacío");
                        }

                    }
                }
            }
            break;
        case "M":
            // Código para Modificación
            if (errorEntrada === 2) {
                /** todo ok modificamos **/
                arrayClientes[cualmodifico].apyn = apynCli
                subeArray();    // sube el array al storage
                
            }
            else {
                if (errorEntrada === 1) {
                    alert("Debe ser un valor numerico entero y positivo");
                }
                else {
                    if (errorEntrada === 3) {
                        alert("El nombre no puede estar en blanco o vacío");
                    }
                }
            }
            break;
    
        case "B":
        default:
            console.log("Opción no válida");
    }
    cualFuncion = "A"
    cualmodifico= -1
    document.getElementById("codigo").disabled = false;
  })
  





    //alta();
    /****************   borrar si todo funciona ********************** */
   /* if (zerror === 0) {
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
})*/

/* Escucha dobleclick en lista de clientes */
tablaBody.addEventListener("dblclick", function (event) {
    // Buscamos el renglon de la tablaclientes donde se realizo el 2click
    // Solo cuando está activado el modo alta (A)
    if (cualFuncion==="A"){                    
        const filaClickeada = event.target.closest("tr");
        if (!filaClickeada) return;

        // Obtengo todas las filas actuales del tbody como array
        const wfilas = Array.from(tablaBody.querySelectorAll("tr"));
        const windice = wfilas.indexOf(filaClickeada);
        codigo.value=arrayClientes[windice].codi;
        nombre.value=arrayClientes[windice].apyn;
        document.getElementById("codigo").disabled = true;
        cualFuncion="M"
        cualmodifico=windice
    }
})

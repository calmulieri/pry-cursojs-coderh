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
let arrayClientes = [];
   // { codi: "1", apyn: "Juan Pérez" },
    //{ codi: "2", apyn: "María García" },
    //{ codi: "3", apyn: "Carlos Gómez" }

// Este array contendrá los datos codigo y nombre
let cualFuncion = "A"    // Variable que indica la función de la transacción A=Alta - M=Modifica - B=Baja - A es default
let cualmodifico = -1    // variable que contendrá el indice de la tabla a modificar o dar de baja
/* Defino constantes del formulario */
const formulario = document.getElementById("formulario");
const tablaClientes = document.getElementById("tablaClientes");
const tablaBody = document.querySelector("#tablaClientes tbody");
const filas = tablaBody.querySelectorAll("tr");
const boton = document.getElementById("boton");
const btnCancelar = document.getElementById("btncancelar")
const btnBaja = document.getElementById("btnbaja")
const codigo = document.getElementById("codigo")
const nombre = document.getElementById("nombre")
const ingresados = document.getElementById("ingresados")
const buscarNombre = document.getElementById("buscarnombre");
const btnBuscar = document.getElementById("btnBuscar");
let apynCli = ""; // variable de trabajo
let codCli = 0;   // variable de trabajo
let errorEntrada = 0;   // utilizado para indicar codigos de error de inputs y mensajes

/* defino funciones */
/* funcion para mostrar textos de ayuda o mensajes en el footer*/
function mostrarAyuda(mensaje) {
    const ayuda = document.getElementById("ayudaFooter");
    ayuda.innerText = mensaje;
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
/* funcion para validar el ingreso de los datos */
function limpiaForm() {
    cualFuncion = "A"
    cualmodifico = -1
    document.getElementById("formulario").reset();
    document.getElementById("codigo").disabled = false;
    document.getElementById("nombre").disabled = false;
    btnBaja.disabled = true;
    tablaBody.innerHTML = "";
    completaTabla();
}
function muestraError(esteError) {
    if (esteError === 1) {
        Swal.fire({
            title: "Ingreso de código cliente",
            text: "Debe ser un valor numerico entero y positivo",
            icon: "error"
        });
    }
    else {
        if (esteError === 2) {
            Swal.fire({
                title: "Ingreso de código cliente",
                text: "No pueden repetirse codigos",
                icon: "error"
            });
        }
        else {
            if (esteError === 3) {
                Swal.fire({
                    title: "Ingreso de código Apellido y nombre",
                    text: "El nombre no puede estar en blanco o vacío",
                    icon: "error"
                });
            }
            else {
                if (esteError === 4) {
                    Swal.fire({
                        title: "Registro existente",
                        text: "El registro existe - puede modificar o dar de baja",
                        icon: "info"
                    });
                }
            }

        }
    }
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
                if (cualFuncion === "A") {
                    errorEntrada = 2 /* Codigo ya existe */
                }
                else {
                    errorEntrada = 0 /* Modificación o baja */
                }
            }
        }
    }
    muestraError(errorEntrada)
    return
}
/* Funcion para subir el array al storage*/
function subeArray() {
    localStorage.setItem("clientes", JSON.stringify(arrayClientes));
    return
}


/* Funcion para bajar el storage al array*/
/*En caso del dom vacío utilizo un json local para cargar un lote inicial por defecto*/
/*La idea sería simular como si fuera a buscar una bbdd que sería a lo que apuntaría en una etapa avanzada*/
/*del proyecto cuando sepa como accesar BBDD   !!!! ESPERO SE ENTIENDA!!!!*/ 
async function bajastorage() {
    if (arrayClientes.length === 0) {
        arrayClientes = JSON.parse(localStorage.getItem("clientes")) || [];
        // Si sigue vacío, intentamos obtener los datos desde un archivo json
        if (arrayClientes.length === 0) {
            try {
                const respuesta = await fetch("clientes.json");
                if (!respuesta.ok) throw new Error('Error al cargar datos desde el archivo');
                arrayClientes = await respuesta.json();
                subeArray(); // los guardo en storage para futuras sesiones
            } catch (error) {
                Swal.fire("Error, no pude obtener registros del json", "error");
            }
        }
        tablaBody.innerHTML = "";
    }
    completaTabla();
}
/*defino Eventos*/
/* escucha si se carga el formulario html */
addEventListener("DOMContentLoaded", function () {
    limpiaForm();
    bajastorage(); //Trae registros del storage si hay
    mostrarAyuda("Ingrese un código para alta o dobleclik en la lista para elegir cliente") 
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
            break;
        case "M":
            // Código para Modificación
            if (errorEntrada === 0) {
                /** todo ok modificamos **/
                arrayClientes[cualmodifico].apyn = apynCli
                subeArray();    // sube el array al storage
                tablaBody.innerHTML = "";
                completaTabla();
            }
            break;
        case "B":
        default:
            Swal.fire("Error grave... opción fuera de contexto lógico... contactar al sevicio técnico ", "error");
    }
    limpiaForm()
})
/* Escucha dobleclick en lista de clientes */
tablaBody.addEventListener("dblclick", function (event) {
    // Buscamos el en la tablaclientes donde se realizo el 2click
    // Solo cuando está activado el modo alta (A)
    if (cualFuncion === "A") {
        const filaClickeada = event.target.closest("tr");
        if (!filaClickeada) return;

        // ubico el codigo de cliente de la celda clickeada para buscar en el array y traer el indice
        const celdas = filaClickeada.querySelectorAll("td");
        const codSeleccionado = celdas[0].textContent;

        // guardo el índice en el arrayClientes
        const indiceReal = arrayClientes.findIndex(cliente => cliente.codi == codSeleccionado);

        if (indiceReal === -1) {
            Swal.fire({
                title: "Registro no encontrado",
                text: "No se encontró el cliente seleccionado.",
                icon: "warning"
            });
            return;
        }
        else {
            // Cargar los datos en el formulario
            codigo.value = arrayClientes[indiceReal].codi;
            nombre.value = arrayClientes[indiceReal].apyn;
            codigo.disabled = true;
            cualFuncion = "M";
            cualmodifico = indiceReal;
            errorEntrada = 4 // solo informativo para mensaje
            muestraError(errorEntrada)
            btnBaja.disabled = false; // habilito btnBaja por si se quiere dar de baja
        }
    }
})
/* Evento click en el boton cancelar */
btnCancelar.addEventListener("click", function () {
    limpiaForm();
})
/* Evento click en el boton buscar - si encuentra mustra resultados en tblaBody */
btnBuscar.addEventListener("click", function () {
    const textoBuscar = buscarNombre.value.trim().toLowerCase();

    if (textoBuscar === "") {
        Swal.fire({
            title: "Buscar",
            text: "Debe ingresar un nombre o parte del nombre para buscar.",
            icon: "warning"
        });
        return;
    }
    const resultados = arrayClientes.filter(cliente =>
        cliente.apyn.toLowerCase().includes(textoBuscar)
    );

    if (resultados.length > 0) {
        // Muestra solo los resultados encontrados
        // Limpia la tabla actual
        tablaBody.innerHTML = "";
        resultados.forEach(cliente => {
            agregafila(cliente.codi, cliente.apyn);
        });
    } else {
        // Si no hay resultados, muestra mensaje
        Swal.fire({
            title: "Buscar",
            text: "No encontré registros con esa búsqueda",
            icon: "warning"
        });
    }
    buscarNombre.value = "";
});
/* Evento click en el boton baja - combinado con sweet alert da baja del dom del array y la tabla  */
btnBaja.addEventListener("click", function () {
    // no debiar ocurrir por boton diable - pero lo dejo por si acaso hasta que este bien probado 
    if (cualmodifico === -1 || cualFuncion !== "M") {
        Swal.fire({
            title: "Baja de cliente",
            text: "Primero debés seleccionar un cliente haciendo doble clic en la tabla.",
            icon: "info"
        });
        return;
    }

    // uso sweet para confirmar la baja
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción dará de baja el cliente seleccionado.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Dar de BAJA el cliente',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6'
    }).then((result) => {
        if (result.isConfirmed) {
            //Elimino registro del array
            arrayClientes.splice(cualmodifico, 1);
            // Guardo en el strorage
            subeArray();
            // Limpio formulario
            limpiaForm();
            Swal.fire('Eliminado', 'El cliente ha sido eliminado con éxito.', 'success');
        }
    });
});

/* Pre entrega nº2 */
/* Evolucion del primer ejercicio enviado en preentrega 1 */
/* La idea es simular un alta de clientes y un listado de los clientes cargados */
/* Por ahora no incluyo ni bajas ni modificaciones pero sería algo para mejorar cuando pueda grabar en una BBDD  */
/* Bloque de definición de variables */

/*let apynCli = "" /* variable para Apellido y nombre cliente */
let arrayCli = [] /*se guardaran los códigos de cliente  */
let arrayApyn = []/* se guardaran los nombres de clientes en la misma posición que su codigo en la otra array */
let opcion = ""
let codCli = 0/* variable para el codigo de cliente */
let arrayClientes=[] /* defino array vacia que va a contener los objetos cliente */
const objCliente = {
    objcCdcli:0,
    objApyn:""
};



/* Bloque de definicion de funciones 
/* Funcion de input de codigo de cliente - La idea es que la función permita el input del codigo de cliente y haga alguna validación*/
function alta() {
    codCli = parseInt(prompt("Ingrese código cliente"))
    if (isNaN(codCli) || codCli <= 0) {
        alert("Debe ser un valor numerico entero y positivo")
        opcion = "Z" /* Z marca que hubo error */
    }
    else {
        if (arrayCli.indexOf(codCli) != -1) {
            console.log(arrayCli.indexOf(codCli))
            alert("No pueden repetirse códigos")
            opcion = "Z" /* Z marca que hubo error */
        }
    }
    return
}

/* Funcion de input de apellido y nombre  - */
function ingApyn() {
    apynCli = prompt("Ingrese Apellido y nombres")
    if (apynCli === "") {
        alert("El nombre no puede estar vacío")
        opcion = "Z" /* Z marca que hubo error */
    }
    return
}
/* Funcion que incorpora el codigo de cliente al array que guarda el codigo en la posición final y guarda su nombre en la otra array  */
function altaCli(cliente,apyn) {
    indice = arrayCli.push(cliente);
    arrayApyn[indice - 1] = apyn;
    console.log(arrayApyn[indice - 1])
    alert("Alta realizada")
    return indice
}

/* Funcion para mostrar el contenido de los array */
function listarCli(){
    for (let i = 0; i < arrayCli.length; i++) {
        prompt(`${arrayCli[i]} - ${arrayApyn[i]} en posición: ${i}`)
    }
}


/* Bloque inicial del programa */
while (opcion != "F") {
    opcion = prompt("Ingresa una opción: A=Dar alta cliente, L=Listar , F=Finalizar")
    if (opcion === "A") {
        alta()
        if (opcion != "Z") {           /*sin error  */
            ingApyn()
            if (opcion != "Z") {       /* sin error */
                altaCli(codCli,apynCli)
                alert(`Se agregó: ${arrayCli[indice - 1]} - ${arrayApyn[indice - 1]} en posición: ${indice - 1}`)
            }
        }
    }
    else{
        if (opcion === "L"){
                listarCli()
            }
        else 
            {alert("Se produjo algún tipo de error")}
    }
}


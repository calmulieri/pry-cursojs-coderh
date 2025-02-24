/* Pre entrega nº1 */
/* Bloque de definición de variables */

let apynCli = ""
let arrayCli = []
let arrayApyn = []
let opcion = ""
let codCli = 0

/* Bloque de definicion de funciones */
/* Funcion de input de codigo de cliente */
function alta() {
    codCli = parseInt(prompt("Ingrese código cliente"))
    if (codCli === NaN || codCli === 0) {
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

/* Funcion de input de apellido y nombre */
function ingApyn() {
    apynCli = prompt("Ingrese Apellido y nombres")
    if (apynCli === "") {
        alert("El nombre no puede estar vacío")
        opcion = "Z" /* Z marca que hubo error */
    }
    return
}
/* Funcion que incorpora el codigo de cliente al array */
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










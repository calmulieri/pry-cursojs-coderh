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
const formulario = document.getElementById("formulario");
const boton = document.getElementById("boton");
const codigo = document.getElementById("codigo")
const nombre = document.getElementById("nombre")
const ingresados = document.getElementById("ingresados")
let apynCli = ""; // variable de trabajo
let codCli = 0;   // variable de trabajo

/*defino funciones */
    
 
/* inicio del bloque de logica */
    boton.addEventListener("click", function() {
        codCli=codigo.value;
        apynCli=nombre.value;
        const nuevocliente = new cliente(codCli, apynCli);  
        ingresados.text=`datos: ${codCli}  ${apynCli}`
    })




 
    
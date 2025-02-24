/*console.log("Este es mi primer intervención en JS---:")
/* Inicio de mi programa de prueba */
/* Usar let o const ----   no usar var para la definición de variables */

let miusuario = "cmulieri" /* con let la variable puede ser mocificada */
let minumero = prompt("Ingresa tu DNI:") /* prompt permite un input por consola */
const usuariofinal = miusuario /* const declara variable cuyp valor no puede ser modificado */
alert(usuariofinal) /* muestra mensaje por consola */
console.log(usuariofinal)
console.log(miusuario)
console.log(minumero)
if (minumero > 10) { alert("El número ingresado spuera 10") }
else
    if (minumero <= 10 && minumero >= 8) { alert("El número esta entre 8 y 10") }
    else { alert("Este número esta por debajo de 8") }

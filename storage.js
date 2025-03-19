/*codigo para practicar storage)*/
/*const minombre = "Carlos"
const mirol = "Gerente"
localStorage.setItem('nombre', JSON.stringify(minombre))
localStorage.setItem('rol', JSON.stringify(mirol))
const traigo1 = JSON.parse(localStorage.getItem('nombre'));
const traigo2 = JSON.parse(localStorage.getItem('rol'));
alert(`traigo del storage los siguiente valores ${traigo1} ${traigo2} `);*/

let arrayClientes=[] /* defino array vacia que va a contener los objetos cliente */
let objCliente = {
    objcCodcli:100,
    objcApyn:"Mulieri Carlos"
};
arrayClientes.push({objCliente})
objCliente = {
    objcCodcli:200,
    objcApyn:"Vaquero Monica"
};
arrayClientes.push({objCliente})

console.log(arrayClientes)

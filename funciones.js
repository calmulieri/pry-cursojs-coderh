/* js para estudiar funciones y funciones constructoras */
/* defino una clase */
class cliente
{
    constructor(codcli,apyn,direccion)
    {
        this.codcli=codcli;
        this.apyn=apyn;
        this.direccion=direccion;
        this.describir = function(){
            console.log(`Cliente: ${this.codcli}, ${this.apyn}, ${this.direccion}`);
        }
    }
    
}
let micliente=prompt("Ingrese un codigo de cliente")
let miapyn=prompt("Ingrese su razon social")
let midireccion=prompt("Ingrese la direccion")
const nuevocliente = new cliente(micliente,miapyn,midireccion);
console.log(nuevocliente.apyn);
console.log(nuevocliente.codcli);
nuevocliente.describir();



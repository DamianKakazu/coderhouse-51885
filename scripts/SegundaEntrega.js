
class Producto {
    constructor(nombre, precio){
        this.nombre = nombre.toUpperCase();
        the.precio = parseFloat(precio);
    }
}

const productos = [];

let productosComprados = "";
//Objeto + Función Flecha
const objMenu = {
    
    menuInicial: () => {
        let menu = "Menú Carrito de Compra de tu Bici\n";
        menu+="1. Comprar Cannondale \n";
        menu+="2. Comprar Spezialized \n";
        menu+="3. Comprar Giant \n";
        menu+="4. Salir \n";
        menu+="Ingrese una opción para continuar.\n\n";
        
        console.log(menu);

        let codigo = 0;
        do{
            codigo = parseInt(prompt(menu));
            if (codigo > 0 && codigo < 4 )
            {
                switch(codigo){
                    case 1:
                        
                        const productoCannondale = {
                            nombre: "Cannondale",
                            precio: 1500,
                        }
                        productos.push(productoCannondale);
                        break;
                    case 2:
                        
                        const productoSpezialized = {
                            nombre: "Spezialized",
                            precio: 3200,
                        }
                        productos.push(productoSpezialized);

                        break;
                    case 3:
                        
                        const productoGiant = {
                            nombre: "Giant",
                            precio: 3200,
                        }
                        productos.push(productoGiant);
                        break;
                    default:
                        console.log("Error inesperado.");
                }
            }
        }while (codigo!=4);

        return;
    },

    productosSeleccionado: () => {

        for(const producto of productos)
        {
            //alert(producto.nombre);
            productosComprados += producto.nombre + "\n";
        }
        alert("Usted ha comprado los siguientes Productos: \n " + productosComprados);
    }

};


objMenu.menuInicial();
objMenu.productosSeleccionado();



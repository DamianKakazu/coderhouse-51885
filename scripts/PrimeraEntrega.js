

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
                        productosComprados += "Cannondale \n"
                        break;
                    case 2:
                        productosComprados += "Spezialized \n"
                        break;
                    case 3:
                        productosComprados += "Giant \n"
                        break;
                    default:
                        console.log("Error inesperado.");
                }
            }
        }while (codigo!=4);

        return;
    }

};


objMenu.menuInicial();
alert("Usted ha comprado los siguientes Productos: \n " + productosComprados);

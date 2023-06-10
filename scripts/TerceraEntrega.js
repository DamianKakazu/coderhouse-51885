


//Productos Almacenados para Vender.
const storedProducts = [{"producto": "Cannondale", "descripcion": "Lorem ipsum"}, {"producto": "Giant", "descripcion": "Lorem ipsum"}];


const objShoppingCart = {

    shoppingCartProducts : [],

    initProcess: ()=> {
        const productosCarritosStr = JSON.stringify(storedProducts);
        localStorage.clear();
        localStorage.setItem("StoredProducts", productosCarritosStr);
    },

    getProductsFromStorage: () => {
        this.shoppingCartProducts =  JSON.parse(localStorage.getItem("StoredProducts"));
    },

    setProductInShoppingCart:() => {
        console.log(shoppingCartProducts);
    }
} 


//Inicializando el proceso para emular la recuperación de productos del LocalStorage.
objShoppingCart.initProcess();
//Recupera los productos del LocalStorage. 
objShoppingCart.getProductsFromStorage();
//Muestro los productos en el Carrito de Compra.
objShoppingCart.setProductInShoppingCart();
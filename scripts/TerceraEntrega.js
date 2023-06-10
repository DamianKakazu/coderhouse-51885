//Productos Almacenados para Vender.
const storedProducts = [{"producto": "Cannondale", "descripcion": "Lorem ipsum"}, {"producto": "Giant", "descripcion": "Lorem ipsum"}];

const shoppingCart = {

    objShoppingCartProducts : [],

    initProcess: ()=> {
        const productosCarritosStr = JSON.stringify(storedProducts);
        localStorage.clear();
        localStorage.setItem("StoredProducts", productosCarritosStr);
    },

    getProductsFromStorage: () => {
        this.objShoppingCartProducts =  JSON.parse(localStorage.getItem("StoredProducts"));
    },

    setProductInShoppingCart:() => {
        console.log(objShoppingCartProducts);
    }
} 


//Inicializando el proceso para emular la recuperación de productos del LocalStorage.
shoppingCart.initProcess();
//Recupera los productos del LocalStorage. 
shoppingCart.getProductsFromStorage();
//Muestro los productos en el Carrito de Compra.
shoppingCart.setProductInShoppingCart();
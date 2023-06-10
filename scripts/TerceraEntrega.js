


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



objShoppingCart.initProcess();
objShoppingCart.getProductsFromStorage();
objShoppingCart.setProductInShoppingCart();
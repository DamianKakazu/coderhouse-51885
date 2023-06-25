//JSON: Productos Almacenados para Vender.
const storedProducts = [
    {
        "idProducto" : "Product01",
        "nombreProducto": "Cuadros", 
        "descripcion": "¿Buscas el cuadro de bicicleta perfecto que sea ligero pero resistente? ¡No busque más! Estos son algunos consejos para elegir el mejor cuadro de bicicleta de carbono!",
        "srcImages" : "./images/Productos/josh-nuttall-eTrHMJwI5ro-unsplash.jpg"
    }, 
    {
        "idProducto" : "Product02",
        "nombreProducto": "Vintage", 
        "descripcion": "¿Busca un modo de transporte único y ecológico? ¡No busques más allá de la bicicleta de carbono vintage! Aquí hay algunos consejos para ayudarlo a comenzar.",
        "srcImages" : "./images/Productos/murillo-de-paula-o2FCfhNSjPo-unsplash2.jpg"
    },
    {
        "idProducto" : "Product03",
        "nombreProducto": "El Futuro", 
        "descripcion": "¡Hola, entusiastas de TuBici! ¡Tenemos un emocionante lanzamiento en camino! Prepárate para experimentar el futuro del ciclismo con nuestros nuevos cuadros y manubrios para bicicletas. Perfecto para todas tus aventuras en bicicleta y diseñado para brindarte la conducción más suave hasta el momento. ¡Estén atentos para más actualizaciones y prepárense para mejorar su juego de ciclismo!",
        "srcImages" : "./images/Productos/harley-davidson-HG3Zy9sCCUg-unsplash2.jpg"
    },    
    {
        "idProducto" : "Product04",
        "nombreProducto": "Bicis", 
        "descripcion": "¿Has estado pensando en comprar una bicicleta nueva pero no sabes por dónde empezar? ¡Las bicicletas de carbono pueden ser perfectas para ti! Aquí hay algunos consejos para ayudarlo a tomar la decisión correcta.",
        "srcImages" : "./images/Productos/max-whitehead-4zKIbJjryOo-unsplash2.jpg"
    },    
    {
        "idProducto" : "Product05",
        "nombreProducto": "Manubrios", 
        "descripcion": "¿Estás buscando formas de mejorar tu juego de ciclismo? ¡No busques más allá de los manubios de bicicleta de carbono! Aqui hay unas ideas para que puedas comenzar",
        "srcImages" : "./images/Productos/josh-nuttall-zkVi57UYHIQ-unsplash.jpg "
    }, 
];

const shoppingCart = {

    objShoppingCartProducts : [],

    initProcess: ()=> {
        //Hago un stringify sobre el array para procesarlo como JSON
        const productosCarritosStr = JSON.stringify(storedProducts);
        //Limpio por las dudas mi localStorage.
        localStorage.clear();
        //Seteo los productos del Carrito de compra.
        localStorage.setItem("StoredProducts", productosCarritosStr);
    },

    getProductsFromStorage: () => {
        
        this.objShoppingCartProducts =  JSON.parse(localStorage.getItem("StoredProducts"));
    },

    setProductInShoppingCart:() => {
        for(const producto of objShoppingCartProducts)
        {
            const card = document.createElement("div");
            card.idProducto = producto.idProducto;
            card.className = "mainContainerProducto__tarjeta margen";

            const cardImage = document.createElement("img");
            cardImage.src = producto.srcImages;

            card.appendChild(cardImage);

            card.innerHTML += "<h2>" + producto.nombreProducto + "</h2>";
            card.innerHTML += "<p>" + producto.descripcion + "</p>";
            card.innerHTML += "<br></br>";
            
            card.innerHTML += "<button id=" + producto.idProducto + " onclick=\"Swal.fire('Quiere agregar el producto al carrito?','Esta seguro?','question') \">Agregar al Carrito</button>";

            card.innerHTML += "<br></br>";
            card.innerHTML += "<button id=" + producto.idProducto + " onclick=\" Swal.fire('Quiere comprar ahora?','Esta seguro?','question') \"; >Comprrar ahora</button>";

            let products = document.querySelector("#listProducts");
            products.appendChild(card);

            console.log(card);
        }
    }
} 


//Inicializando el proceso para emular la recuperación de productos del LocalStorage.
shoppingCart.initProcess();
//Recupera los productos del LocalStorage. 
shoppingCart.getProductsFromStorage();
//Muestro los productos en el Carrito de Compra.
shoppingCart.setProductInShoppingCart();
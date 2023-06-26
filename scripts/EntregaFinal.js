

let shoppingCartProduct = [];
let selectedProduct = [];

function createCardProducts(Products){
    let products = document.querySelector("#listProducts");

    Products.forEach(producto => {
        const card = document.createElement("div");
        card.idProducto = producto.idProducto;
        card.className = "mainContainerProducto__tarjeta margen";

        const cardImage = document.createElement("img");
        cardImage.src = producto.srcImages;

        card.appendChild(cardImage);

        card.innerHTML += "<h2>" + producto.nombreProducto + "</h2>";
        card.innerHTML += "<p>" + producto.descripcion + "</p>";
        card.innerHTML += "<br></br>";
        
        //card.innerHTML += "<button id=" + producto.idProducto + " onclick=\"Swal.fire('Quiere agregar el producto al carrito?','Esta seguro?','question') \">Agregar al Carrito</button>";
        card.innerHTML += "<button id=" + producto.idProducto + " onclick=\" agregarAlCarrito('" + producto.idProducto  +"'); \">Agregar al Carrito</button>";

        card.innerHTML += "<br></br>";
        card.innerHTML += "<button id=" + producto.idProducto + " onclick=\" Swal.fire('Quiere comprar ahora?','Esta seguro?','question') \"; >Comprrar ahora</button>";

        products.appendChild(card);
    });
}

async function loadProductsShoppingCart()
{
    const response = await fetch('./data/Productos.json');
    const jsonData = await response.json();
    shoppingCartProduct = jsonData;
    createCardProducts(jsonData);
    
};

function saveSelectedProduct()
{
    //Hago un stringify sobre el array para procesarlo como JSON
    const productosCarritosStr = JSON.stringify(selectedProduct);
    //Limpio por las dudas mi localStorage.
    localStorage.clear();
    //Seteo los productos del Carrito de compra.
    localStorage.setItem("StoredSelectedProducts", productosCarritosStr);

}

function loadSelectedProduct()
{
    selectedProduct =  JSON.parse(localStorage.getItem("StoredSelectedProducts"));
    if (Array.isArray(selectedProduct) && selectedProduct.length > 0){
        alert("tiene productos");
    }else{
        selectedProduct = [];
    }
}




function agregarAlCarrito(productId){
    const elem = document.querySelector( '[id='+ productId +']');
    console.log(elem);
    alert(productId);
    //console.log(shoppingCartProduct);

    if (shoppingCartProduct.length > 0)
    {
        let elemento = shoppingCartProduct.find(item => item.idProducto == productId);   
        console.log(elemento);

        //const elementoGuardado = selectedProduct.find(item => item.idProducto == productId)
        if (selectedProduct.indexOf(elemento) >= 0)
        {
            alert('Producto ya seleccionado.');
        }
        else{
            alert('Producto no seleccionado.');
            selectedProduct.push(elemento);

            saveSelectedProduct();
        }

        
    }
}




this.loadProductsShoppingCart();
console.log(document.querySelector("#listProducts"));
this.loadSelectedProduct();
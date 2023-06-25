

let shoppingCartProduct = [];

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
            
            card.innerHTML += "<button id=" + producto.idProducto + " onclick=\"Swal.fire('Quiere agregar el producto al carrito?','Esta seguro?','question') \">Agregar al Carrito</button>";

            card.innerHTML += "<br></br>";
            card.innerHTML += "<button id=" + producto.idProducto + " onclick=\" Swal.fire('Quiere comprar ahora?','Esta seguro?','question') \"; >Comprrar ahora</button>";

            products.appendChild(card);
        });

}



async function loadProducts()
{
    const response = await fetch('./data/Productos.json');
    const jsonData = await response.json();
    
    createCardProducts(jsonData);
    
};





this.loadProducts();
// console.log(shoppingCartProduct);
// if (shoppingCartProduct === Object && shoppingCartProduct.length > 0)
// {
//     let objShoppingCart = new ShoppingCart();
//     objShoppingCart.shoppingCardProducts();
// }
// objShoppingCart.loadProducts();




// class ShoppingCart
// {
//     shoppingCartProducts  = [];
  
    
//     loadProducts()
//     {
//         async function loadJsonProduct(){
//             const response = await fetch('./data/Productos.json');
//             const jsonData = await response.json();
//             let products = document.querySelector("#listProducts");
//             jsonData.forEach(producto => {
//                 const card = document.createElement("div");
//                 card.idProducto = producto.idProducto;
//                 card.className = "mainContainerProducto__tarjeta margen";
    
//                 const cardImage = document.createElement("img");
//                 cardImage.src = producto.srcImages;
    
//                 card.appendChild(cardImage);
    
//                 card.innerHTML += "<h2>" + producto.nombreProducto + "</h2>";
//                 card.innerHTML += "<p>" + producto.descripcion + "</p>";
//                 card.innerHTML += "<br></br>";
                
//                 card.innerHTML += "<button id=" + producto.idProducto + " onclick=\"Swal.fire('Quiere agregar el producto al carrito?','Esta seguro?','question') \">Agregar al Carrito</button>";
    
//                 card.innerHTML += "<br></br>";
//                 card.innerHTML += "<button id=" + producto.idProducto + " onclick=\" Swal.fire('Quiere comprar ahora?','Esta seguro?','question') \"; >Comprrar ahora</button>";
    
//                 products.appendChild(card);
//             })
//         }
//         loadJsonProduct();
//     }
// }

// let objShoppingCart = new ShoppingCart();
// objShoppingCart.loadProducts();


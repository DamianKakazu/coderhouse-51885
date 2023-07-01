

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
        card.innerHTML += "<button id=" + producto.idProducto + " onclick=\" listarCarrito(); \">Listar Carrito</button>";

        card.innerHTML += "<br></br>";
        card.innerHTML += "<button id=" + producto.idProducto + " onclick=\" comprar() \"; >Comprrar ahora</button>";

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
        Swal.fire({
            icon: 'info',
            title: '',
            text: 'Usted tiene guardado productos en su carrito de compra.',
            footer: ''
        })
            
    }else{
        selectedProduct = [];
    }
}




function agregarAlCarrito(productId){
    const elem = document.querySelector( '[id='+ productId +']');
    console.log(elem);
    // alert(productId);
    //console.log(shoppingCartProduct);

    if (shoppingCartProduct.length > 0)
    {
        let elemento = shoppingCartProduct.find(item => item.idProducto == productId);   
        console.log(elemento);

        //const elementoGuardado = selectedProduct.find(item => item.idProducto == productId)
        if (selectedProduct.indexOf(elemento) >= 0)
        {
            Swal.fire({
                icon: 'info',
                title: '',
                text: 'El Producto, ' + elemento.nombreProducto +', ya se encuentra en el Carrito de Compras',
                footer: 'Pruebe en seleccionar otro producto'
            })
                
        }
        else{
            Swal.fire({
                title: '¿Esta seguro que quiere sumar el ' + elemento.nombreProducto + ' al Carrito de Compra?',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    selectedProduct.push(elemento);
                    Swal.fire('Saved!', '', 'success')
                } else if (result.isDenied) {
                  Swal.fire('Changes are not saved', '', 'info')
                }
              })
            saveSelectedProduct();
        }       
    }
}

function listarCarrito()
{
    if (Array.isArray(selectedProduct) && selectedProduct.length > 0){
        let productos = "";
        for(const producto of selectedProduct)
        {
            productos += producto.nombreProducto + "\n";
        }

        Swal.fire({
            icon: 'info',
            title: 'Carrito de compra',
            text: 'Los productos que ya se encuentran en el carrito son: ' + productos,
            footer: ''
        })

    }else{
        selectedProduct = [];
        Swal.fire({
            icon: 'info',
            title: 'Carrito de compra',
            text: 'No tiene productos en el carrito' ,
            footer: ''
        })
    }

}

function comprar()
{
    let productos = "";
    for(const producto of selectedProduct)
    {
        productos += producto.nombreProducto + "\n";
    }

    Swal.fire({
        title: 'Felicitaciones usted ha realizar correctamente la compra! Sus productos son: ' + productos,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    
    selectedProduct = [];
    //Limpio por las dudas mi localStorage.
    localStorage.clear();
    //Seteo los productos del Carrito de compra.
    localStorage.setItem("StoredSelectedProducts", "");
}



this.loadProductsShoppingCart();
console.log(document.querySelector("#listProducts"));
this.loadSelectedProduct();
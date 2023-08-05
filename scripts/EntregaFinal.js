

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
        //card.innerHTML += "<button id=" + producto.idProducto + " onclick=\" listarCarrito(); \">Listar Carrito</button>";

        card.innerHTML += "<br></br>";
        //card.innerHTML += "<button id=" + producto.idProducto + " onclick=\" comprar() \"; >Comprar ahora</button>";

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

function valideKey(evt){
    
    // code is the decimal ASCII representation of the pressed key.
    var code = (evt.which) ? evt.which : evt.keyCode;
    
    if(code==8) { // backspace.
      return true;
    } else if(code>=48 && code<=57) { // is a number.
      return true;
    } else{ // other keys.
      return false;
    }
}

function borrarproductoseleccionado(productId){
    const elem = document.querySelector( '[id=prdSeleccionado_'+ productId +']');
    elem.remove();
    //eliminar elemento del array
    let elemento = shoppingCartProduct.find(item => item.idProducto == productId);
    const index = selectedProduct.indexOf(elemento);
    selectedProduct.splice(index, 1);
}

function agregarAlCarrito(productId){
    const elem = document.querySelector( '[id='+ productId +']');



    if (shoppingCartProduct.length > 0)
    {
        let elemento = shoppingCartProduct.find(item => item.idProducto == productId);   



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
                html: 
                    '<img src="'+ elemento.srcImages +'">' +
                    '<br></br>' + 
                    '<h2>' + elemento.nombreProducto  +'</h2>' +
                    '<h3>Cantidad: </h3> <input type="text" id="' + elemento.nombreProducto + 'Cantidad" name="Cantidad" value="1" onkeypress="return valideKey(event);"/> ' +
                    '<br></br>',
                
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    elemento.Cantidad = document.getElementById(elemento.nombreProducto+'Cantidad').value;
                    selectedProduct.push(elemento);
                    Swal.fire('Saved!', '', 'success')
                      //Dibujar Producto
                    ProductosSeleccionado(elemento);
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

    if(selectedProduct.length > 0)
    {
        for(const producto of selectedProduct)
        {
            productos += producto.nombreProducto + "(Cantidad:" + producto.Cantidad + ")" + "\n";
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
        
        limpiar();
    }
    else
    {
        Swal.fire({ icon: 'warning', title: 'Warning', text: 'Su carrito está vacío.', footer: '' });
    }
}

function borrar()
{
    if(selectedProduct.length > 0)
    {
        //Mensaje confirmación
        Swal.fire({ title: 'Borrar', text: "Está seguro de borrar todo?", icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Si, Borrar' }).then((result) => 
        { if (result.isConfirmed) 
            { limpiar();
                Swal.fire( 'Borrado', 'El carrito se encuentra vacío.', 'success' ) } });
    }
    else
    {
        Swal.fire({ icon: 'warning', title: 'Warning', text: 'Su carrito está vacío.', footer: '' });
    }
}

function limpiar()
{    
    selectedProduct = [];

    //Limpio por las dudas mi localStorage.
    localStorage.clear();
    //Seteo los productos del Carrito de compra.
    localStorage.setItem("StoredSelectedProducts", "");

    let products = document.querySelector("#BuyProducts");
    while (products.lastElementChild) {
        products.removeChild(products.lastElementChild);
    }
}

function ProductosSeleccionado(producto){
    let products = document.querySelector("#BuyProducts");
    
    const card = document.createElement("div");
    card.id = 'prdSeleccionado_' + producto.idProducto;
    card.className = "mainContainerProducto__tarjeta2 margen";

    card.innerHTML += "<h2> Producto Seleccionado para la Compra</h2>";
    const cardImage = document.createElement("img");
    cardImage.src = producto.srcImages;

    card.appendChild(cardImage);
    card.innerHTML += "<h2>" + producto.nombreProducto + "(Cantidad:" + producto.Cantidad + ")"  + "</h2>";
    card.innerHTML += "<button id=" + producto.idProducto + " onclick=\" borrarproductoseleccionado('" + producto.idProducto  +"'); \">Borrar producto</button>";
    card.innerHTML += "<br></br>";
    
    products.appendChild(card);
}

this.loadProductsShoppingCart();

this.loadSelectedProduct();
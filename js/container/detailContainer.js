import { Header, eventSearch } from "../components/header.js"
import { Footer } from "../components/footer.js"
//import { DetalleProducto } from "../components/detalleProducto.js"
//import { CompraProducto } from "../components/compraProducto.js"

import { getQueryParams } from "../functions.js"

import { getDetailCripto } from "../services/DetailServices.js"
//import { agregarCarrito } from "../services/carritoServices.js"

//import { getProductsByName } from "../services/productosServices.js"

//import { Card } from "../components/card.js"

var _header = document.getElementById("header");
var _footer = document.getElementById("footer");

export const DetailRender = () => {
    _header.innerHTML=Header();
    _footer.innerHTML=Footer();
    eventSearch();
    var id = getQueryParams().id

    console.log(id)
    console.log('cargo el DOM de la pagina de detalles de la crypto')


    document.getElementById("searchButton").addEventListener('click', event => {
        var searchName = document.getElementById("txtInput").value
        location.href =`index.html?nameSearch=${searchName}`
    });


}


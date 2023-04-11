import { ItemList } from "../components/itemList.js"
import { Header, eventSearch } from "../components/header.js"
import { Footer } from "../components/footer.js"
import { Card } from "../components/card.js"
import { itemListRoot } from "../components/itemListRoot.js"

import { getQueryParams } from "../functions.js"
import { getCriptoAll } from "../services/indexServices.js"

import { getCategories } from "../services/categoriesServices.js"

var _root = document.getElementById("root");
var _items = document.getElementById("items");
var _header = document.getElementById("header");
var _footer = document.getElementById("footer");
var clase;
export const IndexRender = () => {
    _header.innerHTML=Header();
    _footer.innerHTML=Footer();


    getCriptoAll((items) => 
    {
        console.log(items)
        if(items.length > 0)
        {
            items.forEach(item => {
                if(item.price_change_24h>0)
                {
                    clase = "card_up";
                }
                else{
                    clase = "card_down";
                }
                _items.innerHTML +=Card(item.id, item.name, item.current_price, item.image, clase) 
            });
        }
    });   
    

    


    
    /*
    var _sinResultados = document.getElementById("sinResultados");
    var select = document.getElementById("select");
    var nombreProducto = getQueryParams().nombreProducto;
    var sort = getQueryParams().sort;

    if(sort === undefined)
    {
        sort = false;
    }
    select.value = sort;
    
    select.addEventListener('change', (event) => {
        window.open(`./index.html?sort=${event.target.value}`,'_self');
    });

    if(nombreProducto === undefined)
    {
        nombreProducto = ""
    }
    getProductsByName(nombreProducto, sort, (body) => 
    {
        var products = body
        if(products.length > 0)
        {   
            orden.classList.remove("hide");
            products.forEach(product => {
                _root.innerHTML +=Card(product.productoId, product.nombre, product.precio, product.image) 
            });
    
            var buttons = document.querySelectorAll('.verDetalle');
            buttons.forEach(button => button.addEventListener('click', event => {
                var id = event.target.getAttribute("data-id");
                window.open(`./detalleProducto.html?id=${id}`,'_self');
            }
            ));
        }
        else
        {
            orden.classList.add("hide");
            _sinResultados.innerHTML = "No se han encontrado resultados para los datos ingresados";
        }
    });
    */   
}
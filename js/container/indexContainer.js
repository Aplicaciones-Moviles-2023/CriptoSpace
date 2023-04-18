import { ItemList } from "../components/itemList.js"
import { Header, eventSearch } from "../components/header.js"
import { Footer } from "../components/footer.js"
import { Card } from "../components/card.js"
import { itemListRoot } from "../components/itemListRoot.js"
import { getQueryParams } from "../functions.js"
import { getCriptoAll } from "../services/indexServices.js"
import { getCategories } from "../services/categoriesServices.js"



var _items = document.getElementById("items");
var _header = document.getElementById("header");
var _footer = document.getElementById("footer");
var _sinResultados = document.getElementById("sinResultados");
var clase;
var nameSearch = getQueryParams().nameSearch;



//Funcion encargada de mostrar los items en cards
function displayItems(items)
    {
        _items.innerHTML = "";
        if(items.length > 0)
        {   
            _sinResultados.classList.add("hide");

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
    
            //var buttons = document.querySelectorAll('.verDetalle');
            //buttons.forEach(button => button.addEventListener('click', event => {
            //    var id = event.target.getAttribute("data-id");
            //    window.open(`./detalleProducto.html?id=${id}`,'_self');
            //}
            //));
        }
        else
        {
            _sinResultados.classList.remove("hide");
            _sinResultados.innerHTML = "No se han encontrado resultados para los datos ingresados";
        }
    }

//Se ordena un JSON
function sortJSON(data, key, orden) {
    return data.sort(function (a, b) {
        var x = a[key],
        y = b[key];

        if (orden === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }

        if (orden === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}    


function unsortJSON(data){

    const entradas = Object.entries(data);

    entradas.sort(() => Math.random() - 0.5);
  
    const objetoDesordenado = {};
    for (let [propiedad, valor] of entradas) {
      objetoDesordenado[propiedad] = valor;
    }
  
    return objetoDesordenado;
  }

  function hideElement(element)
  {
    if(!element.classList.contains("hide"))
    {
        element.classList.add("hide")
    }
  }



  function simulateEnter() {
    var input = document.getElementById("searchButton");
    var event = new Event("keydown");
    event.key = "Enter";
    event.keyCode = 13;
    event.which = 13;
    input.dispatchEvent(event);
  }

export const IndexRender = () => {
    _header.innerHTML=Header();
    _footer.innerHTML=Footer();
    eventSearch();
    
    var selectOrder = document.getElementById("selectOrder");
    var order = selectOrder.value.split(",")
    var selectFilter = document.getElementById("selectFilter");
    var buttonMoreResults = document.getElementById("MostrarMasButton")
    
    //Se definen las variables necesarias
    var lastItemsFilter = itemsOriginalCompleto;
    var lastItemsSearch = itemsOriginalCompleto;
    var lastItems = itemsOriginalCompleto;
    var lastTextSearch;
    var cantResults = 10
    hideElement(buttonMoreResults)

    var itemsOriginalCompleto = getCriptoAll()
    displayItems(itemsOriginalCompleto);

    if(!(nameSearch === undefined))
    {
        var searchName = document.getElementById("txtInput")
        searchName.value = nameSearch

        lastTextSearch = nameSearch
        lastItems = itemsOriginalCompleto
        lastItems = lastItems.filter(item => item.name.toLowerCase().includes(nameSearch.toLowerCase()))
        if(lastItems.length>cantResults)
        {
            lastItems = lastItems.slice(0,cantResults)
            buttonMoreResults.classList.remove("hide")
        }
        lastItemsFilter = lastItems
        lastItemsSearch = lastItems
        displayItems(lastItems);

    }

    //Busqueda
    document.getElementById("searchButton").addEventListener('click', event => {
        var searchName = document.getElementById("txtInput").value
    
        //Se limpian los select
        selectOrder.selectedIndex = 0;
        selectFilter.selectedIndex = 0;

        //Busqueda SIN parametros (TODO)
        if(searchName === "")
        {
            hideElement(buttonMoreResults)
            lastItems = itemsOriginalCompleto
            lastItemsFilter = itemsOriginalCompleto
            lastItemsSearch = itemsOriginalCompleto
            displayItems(lastItems);
        }
        //Busqueda CON parametros
        else
        {
            lastTextSearch = searchName
            lastItems = itemsOriginalCompleto
            lastItems = lastItems.filter(item => item.name.toLowerCase().includes(lastTextSearch.toLowerCase() || item.id.toLowerCase().includes(lastTextSearch.toLowerCase())))
            if(lastItems.length>cantResults)
            {
                lastItems = lastItems.slice(0,cantResults)
                buttonMoreResults.classList.remove("hide")
            }
            lastItemsFilter = lastItems
            lastItemsSearch = lastItems
            displayItems(lastItems);
        }
    });

    //ORDEN
    selectOrder.addEventListener('change', (event) => {
        var selectOrder = document.getElementById("selectOrder");
        var order = selectOrder.value.split(",")
        
        hideElement(buttonMoreResults)

        if(order[0] === "Sin orden")
        {
            displayItems(lastItems);
        }
        else
        {
            displayItems(sortJSON(lastItems, order[0], order[1]));
        } 
    });

    //Filtros
    selectFilter.addEventListener('change', (event) => {
        var selectFilter = document.getElementById("selectFilter");
        
        hideElement(buttonMoreResults)

        //Ninguno
        if(selectFilter.value === "ninguno")
        {
            lastItemsFilter = lastItemsSearch
            lastItems = lastItemsFilter
            displayItems(lastItemsFilter)
        }
    
        //Balance Positivo
        if(selectFilter.value === "balance positivo")
        {
            lastItemsFilter = lastItemsSearch.filter(item => item.price_change_24h>0)
            lastItems = lastItemsFilter
            displayItems(lastItemsFilter)
        }
        
        //Balance Negativo
        if(selectFilter.value === "balance negativo")
        {    
            lastItemsFilter = lastItemsSearch.filter(item => item.price_change_24h<0)
            lastItems = lastItemsFilter
            displayItems(lastItemsFilter)
        }
    });
    
    buttonMoreResults.addEventListener('click', event => {
        hideElement(buttonMoreResults)
        lastItems = itemsOriginalCompleto
        lastItems = lastItems.filter(item => item.name.toLowerCase().includes(lastTextSearch.toLowerCase()));
        lastItemsFilter = lastItems
        lastItemsSearch = lastItems
        displayItems(lastItems);
    });            


}
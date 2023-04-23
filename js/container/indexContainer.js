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
var clase, checked;
var nameSearch = getQueryParams().nameSearch;

//Funcion encargada de mostrar los items en cards
function displayItems(items) {
    _items.innerHTML = "";
    if (items.length > 0) {
        _sinResultados.classList.add("hide");

        items.forEach(item => {
            //Modifico el color de la carta dependiendo su fluctuacion
            (item.price_change_24h > 0) ? clase = "card_up" : clase = "card_down";
            //Modifico el default del checkbox de favoritos dependiendo si esta o no en el
            //localstorage
            (idIsInLocalStorage(item.id)) ? checked = 'checked' : checked = '';

            _items.innerHTML += Card(item.id, item.name, item.current_price, item.image, clase, checked)
        });

        //var buttons = document.querySelectorAll('.verDetalle');
        //buttons.forEach(button => button.addEventListener('click', event => {
        //    var id = event.target.getAttribute("data-id");
        //    window.open(`./detalleProducto.html?id=${id}`,'_self');
        //}
        //));
    }
    else {
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


function unsortJSON(data) {

    const entradas = Object.entries(data);

    entradas.sort(() => Math.random() - 0.5);

    const objetoDesordenado = {};
    for (let [propiedad, valor] of entradas) {
        objetoDesordenado[propiedad] = valor;
    }

    return objetoDesordenado;
}

function hideElement(element) {
    if (!element.classList.contains("hide")) {
        element.classList.add("hide")
    }
}

export const IndexRender = () => {
    _header.innerHTML = Header();
    _footer.innerHTML = Footer();
    eventSearch();

    var selectOrder = document.getElementById("selectOrder");
    var order = selectOrder.value.split(",")
    var selectFilter = document.getElementById("selectFilter");
    var buttonMoreResults = document.getElementById("MostrarMasButton")

    //Se definen las variables necesarias
    var lastItemsFilter;
    var lastItemsSearch;
    var lastItems;
    var lastTextSearch;
    var cantResults = 10
    hideElement(buttonMoreResults)
    var itemsOriginalCompleto;

    getCriptoAll((result) => {
        itemsOriginalCompleto = result
        lastItemsFilter = itemsOriginalCompleto;
        lastItemsSearch = itemsOriginalCompleto;
        lastItems = itemsOriginalCompleto;
        cantResults = 10
        hideElement(buttonMoreResults)

        displayItems(itemsOriginalCompleto);

        if (!(nameSearch === undefined)) {
            var searchName = document.getElementById("txtInput")
            searchName.value = nameSearch

            lastTextSearch = nameSearch
            lastItems = itemsOriginalCompleto
            lastItems = lastItems.filter(item => item.name.toLowerCase().includes(nameSearch.toLowerCase()))
            if (lastItems.length > cantResults) {
                lastItems = lastItems.slice(0, cantResults)
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
            if (searchName === "") {
                hideElement(buttonMoreResults)
                lastItems = itemsOriginalCompleto
                lastItemsFilter = itemsOriginalCompleto
                lastItemsSearch = itemsOriginalCompleto
                displayItems(lastItems);
            }
            //Busqueda CON parametros
            else {
                lastTextSearch = searchName
                lastItems = itemsOriginalCompleto
                lastItems = lastItems.filter(item => item.name.toLowerCase().includes(lastTextSearch.toLowerCase() || item.id.toLowerCase().includes(lastTextSearch.toLowerCase())))
                if (lastItems.length > cantResults) {
                    lastItems = lastItems.slice(0, cantResults)
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

            hideElement(buttonMoreResults);

            (order[0] === "Sin orden") ? displayItems(lastItems)
                : displayItems(sortJSON(lastItems, order[0], order[1]))
        });

        //Filtros
        selectFilter.addEventListener('change', (event) => {
            var selectFilter = document.getElementById("selectFilter");

            hideElement(buttonMoreResults)

            //Ninguno
            if (selectFilter.value === "ninguno") {
                lastItemsFilter = lastItemsSearch
                lastItems = lastItemsFilter
                displayItems(lastItemsFilter)
            }

            //Balance Positivo
            if (selectFilter.value === "balance positivo") {
                lastItemsFilter = lastItemsSearch.filter(item => item.price_change_24h > 0)
                lastItems = lastItemsFilter
                displayItems(lastItemsFilter)
            }

            //Balance Negativo
            if (selectFilter.value === "balance negativo") {
                lastItemsFilter = lastItemsSearch.filter(item => item.price_change_24h < 0)
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

        //Selecciono los elementos que tengan la case fav 
        //y les agrego el evento del guardado en localstorage con jQuery
        $('.heart').each(function () {
            var fav = this;
            fav.addEventListener('click', event => {
                var id = event.target.getAttribute("data-id");
                updateLocalStorage(id)
            });
        });
    })
}

function updateLocalStorage(id) {
    //Traigo los elementos del localstorage y sino hay nada trabajo con un array vacio
    var favoritos = JSON.parse(localStorage.getItem("Favoritos") || "[]");
    const index = favoritos.indexOf(id);

    (index > -1) ? // IndexOf retorna -1 en el caso de no encontrar un elemento
        favoritos.splice(index, 1) : //Elimino el elemento de la lista en el caso de que esté
        favoritos.push(id); // Añado en el caso que no esté

    favoritos.sort()
    // Guardo la lista de favoritos
    localStorage.setItem("Favoritos", JSON.stringify(favoritos));
}

function idIsInLocalStorage(id) {
    var favoritos = JSON.parse(localStorage.getItem("Favoritos") || "[]");
    const index = favoritos.indexOf(id);
    return ((index > -1))
}
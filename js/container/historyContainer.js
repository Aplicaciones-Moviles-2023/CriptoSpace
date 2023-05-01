import { Header, eventSearch } from "../components/header.js"
import { Footer, startMap } from "../components/footer.js"
import { Card } from "../components/card.js"
import { getQueryParams, searchJsonId } from "../functions.js"
import { getCriptoAll, getCriptoBy, getCriptoByCategory } from "../services/indexServices.js"

//Funcion encargada de mostrar los items en cards
function displayItems(items) {
    _items.innerHTML = "";
    if (items.length > 0) {
        _sinResultados.classList.add("hide");

        items.forEach(item => {
            (item.price_change_24h > 0) ? clase = "card_up" : clase = "card_down";

            (idIsInLocalStorage(item.id)) ? checked = 'checked' : checked = '';
            _items.innerHTML += Card(item.id, item.name, item.current_price, item.image, clase, checked)
        });
    }
    else {
        _sinResultados.classList.remove("hide");
        _sinResultados.innerHTML = "No se han encontrado resultados para los datos ingresados";
    }

    //Selecciono los elementos que tengan la case fav 
    //y les agrego el evento del guardado en localstorage con jQuery
    $('.heart').each(function () {
        var fav = this;
        fav.addEventListener('click', event => {
            var id = event.target.getAttribute("data-id");
            updateLocalStorage(id)
        });
    });

    $('.viewMore').each(function () {
        var viewMore = this;
        viewMore.addEventListener('click', event => {
            var CryptoAAgregar = {
                id: event.target.getAttribute("id-historial"),
                name: event.target.getAttribute("nombre"),
                current_price: event.target.getAttribute("precio"),
                image: event.target.getAttribute("image"),
                clase: event.target.getAttribute("clase"),
                checked: event.target.getAttribute("favChecked")
            };
            AgregarAlHistorial(CryptoAAgregar)
        });
    });

}

function idIsInLocalStorage(id) {
    var favoritos = JSON.parse(localStorage.getItem("Favoritos") || "[]");
    const index = favoritos.indexOf(id);
    return ((index > -1))
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

function AgregarAlHistorial(CryptoAAgregar) {
    var historial = JSON.parse(localStorage.getItem("Historial") || "[]");
    var id = searchJsonId(historial, CryptoAAgregar.id)
    if (id !== -1) {
        historial.splice(id, 1);
    }
    historial.unshift(CryptoAAgregar);
    historial = historial.slice(0, 5)
    localStorage.setItem("Historial", JSON.stringify(historial));
}

var _items = document.getElementById("items");
var _header = document.getElementById("header");
var _footer = document.getElementById("footer");
var _sinResultados = document.getElementById("sinResultados");
var clase;
var checked;


export const HistoryRender = () => {
    _header.innerHTML = Header();
    _footer.innerHTML = Footer();
    eventSearch();
    startMap();

    var historial = JSON.parse(localStorage.getItem("Historial") || "[]");
    displayItems(historial)

}
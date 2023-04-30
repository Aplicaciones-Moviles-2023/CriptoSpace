import { Header, eventSearch } from "../components/header.js"
import { Footer, startMap } from "../components/footer.js"
import { Card } from "../components/card.js"
import { getQueryParams } from "../functions.js"
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
                nombre: event.target.getAttribute("nombre"),
                precio: event.target.getAttribute("precio"),
                image: event.target.getAttribute("image"),
                clase: event.target.getAttribute("clase"),
                favChecked: event.target.getAttribute("favChecked")
            };
            AgregarAlHistorial(CryptoAAgregar)
        });
    });

}

function hideElement(element) {
    if (!element.classList.contains("hide")) {
        element.classList.add("hide")
    }
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
    if (historial.some(item => item.id === CryptoAAgregar.id)) {
        alert('Existe en el historial')
    }
    else {
        historial.push(CryptoAAgregar);
    }
    localStorage.setItem("Historial", JSON.stringify(historial));
}

const GetCriptoAll = (result) => {
    displayItems(result)
}

const GetCriptoBy = (result) => {
    displayItems(result);
}

const GetCriptoByCategory = (result) => {
    displayItems(result);
}


var _items = document.getElementById("items");
var _header = document.getElementById("header");
var _footer = document.getElementById("footer");
var _sinResultados = document.getElementById("sinResultados");
var clase;
var checked;
var nameSearch = getQueryParams().nameSearch;

export const IndexRender = () => {
    _header.innerHTML = Header();
    _footer.innerHTML = Footer();
    eventSearch();
    startMap();


    var selectOrder = document.getElementById("selectOrder");
    var selectCategory = document.getElementById("selectCategory");
    var search = "";
    var order = "";
    var category = ""

    getCriptoAll(order, GetCriptoAll)

    //Busqueda
    document.getElementById("searchButton").addEventListener('click', event => {
        //Limpia los select
        selectOrder.selectedIndex = 0;
        selectCategory.selectedIndex = 0;
        order = "";
        search = document.getElementById("txtInput").value;
        (search === "") ? displayItems(result) : getCriptoBy(search, order, GetCriptoBy)
    });

    //Categorias
    selectCategory.addEventListener('change', (event) => {
        //Limpia el select de orden y el campo de busqueda
        document.getElementById("txtInput").value = ""
        selectOrder.selectedIndex = 0;
        order = "";
        selectCategory = document.getElementById("selectCategory");

        //Ninguna
        if (selectCategory.value === "todas") {
            category = ""
            getCriptoAll(order, GetCriptoAll)
        }
        //Alguna
        else {
            category = selectCategory.value
            getCriptoByCategory(selectCategory.value, order, GetCriptoByCategory)
        }
    });


    //ORDEN
    selectOrder.addEventListener('change', (event) => {
        var selectOrder = document.getElementById("selectOrder");
        var order = selectOrder.value.split(",")

        if (order[1] === "Sin orden" && search === "" && category === "") {
            getCriptoAll(order, GetCriptoAll)
        }

        if (order[1] !== "Sin orden" && search !== "" && category !== "") {
            order = "";
            displayItems(result)
        }

        if (order[1] !== "Sin orden" && search !== "") {
            order = order[1]
            getCriptoBy(search, order, (result) => {
                displayItems(result);
            })
        }

        if (order[1] !== "Sin orden" && category !== "") {
            order = order[1]
            getCriptoByCategory(category, order, (result) => {
                displayItems(result);
            })
        }

        if (order[1] !== "Sin orden" && search == "" && category == "") {
            order = order[1]
            getCriptoAll(order, GetCriptoAll)
        }
    });
}
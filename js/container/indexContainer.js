import { Header, eventSearch } from "../components/header.js"
import { Footer, startMap } from "../components/footer.js"
import { Card } from "../components/card.js"
import { getQueryParams, searchJsonId } from "../functions.js"
import { getCriptoAll, getCriptoBy, getCriptoByCategory, getCryptoById} from "../services/indexServices.js"
import { getLocalizationInfo, CurrencyExists } from "../services/localizationService.js"
import { ImgFlag } from "../components/imgFlag.js"

//Funcion encargada de mostrar los items en cards
function displayItems(items) {
    _items.innerHTML = "";
    if (items.length > 0) {
        _sinResultados.classList.add("hide");

        items.forEach(item => {
            (item.price_change_24h > 0) ? clase = "card_up" : clase = "card_down";

            (idIsInLocalStorage(item.id)) ? checked = 'checked' : checked = '';

            _items.innerHTML += Card(item.id, item.name, item.current_price.toFixed(2), item.image,
                clase, checked, currency.toUpperCase())
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
            AgregarAlHistorial(CryptoAAgregar, currency)
        });
    });

}

function hideElement(element) {
    if (!element.classList.contains("hide")) {
        element.classList.add("hide")
    }
}

function showElement(element) {
    if (element.classList.contains("hide")) {
        element.classList.remove("hide")
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

function AgregarAlHistorial(CryptoAAgregar, currency) {
    var historial = JSON.parse(localStorage.getItem("Historial") || "[]");
    var id = searchJsonId(historial, CryptoAAgregar.id)
    if (id !== -1) {
        historial.splice(id, 1);
    }
    CryptoAAgregar.current_price = `${CryptoAAgregar.current_price} ${currency.toUpperCase()}`
    historial.unshift(CryptoAAgregar);
    historial = historial.slice(0, 5)
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

const GetCriptoById = (result) => {
    displayItems(result);
}

function FlagRender(info) {
    document.getElementById('flag-div').innerHTML += ImgFlag(info.country_flag, 'visible');
    currency = info.currency.code.toLowerCase()
}


var _items = document.getElementById("items");
var _header = document.getElementById("header");
var _footer = document.getElementById("footer");
var _sinResultados = document.getElementById("sinResultados");
var _btnMas = document.getElementById("bntMas")
let currency = 'usd';
var clase;
var checked;
var maxItems = 10;
var favoritos;
var nameSearch = getQueryParams().nameSearch;

if (nameSearch === undefined) {
    nameSearch = ""
}

export const IndexRender = (currentCurrency) => {
    if (CurrencyExists(currentCurrency)) {
        currency = currentCurrency
    }
    _header.innerHTML = Header();
    eventSearch();
    _footer.innerHTML = Footer();
    startMap();
    getLocalizationInfo(FlagRender)

    var selectOrder = document.getElementById("selectOrder");
    var selectCategory = document.getElementById("selectCategory");
    var search = "";
    var order = "";
    var category = ""

    if (nameSearch == "") {
        getCriptoAll(order, -1, GetCriptoAll, currency)
    }
    else {
        getCriptoBy(nameSearch, "", -1, GetCriptoBy, currency)
    }

    //Mostrar mas
    _btnMas.addEventListener('click', event => {
        hideElement(_btnMas)

        if (nameSearch === "") {
            getCriptoAll(order, maxItems, GetCriptoAll, currency)
        }

        if (nameSearch !== "") {
            getCriptoBy(nameSearch, order, maxItems, GetCriptoBy, currency)
        }

        if (category !== "") {
            getCriptoByCategory(selectCategory.value, order, maxItems, GetCriptoByCategory, currency)
        }
    });

    //Busqueda
    document.getElementById("searchButton").addEventListener('click', event => {
        //Limpia los select
        selectOrder.selectedIndex = 0;
        selectCategory.selectedIndex = 0;
        order = "";
        showElement(_btnMas)
        search = document.getElementById("txtInput").value;
        (search === "") ? displayItems(result) : getCriptoBy(search, order, -1, GetCriptoBy, currency)
    });

    //Categorias
    selectCategory.addEventListener('change', (event) => {
        //Limpia el select de orden y el campo de busqueda
        document.getElementById("txtInput").value = ""
        selectOrder.selectedIndex = 0;
        order = "";
        showElement(_btnMas)
        selectCategory = document.getElementById("selectCategory");

        //Ninguna
        if (selectCategory.value === "todas") {
            category = ""
            getCriptoAll(order, -1, GetCriptoAll, currency)
        }
        else {
            //Favoritos
            if(selectCategory.value === "favoritos")
            {
                favoritos = JSON.parse(localStorage.getItem("Favoritos") || "[]");
                selectOrder.selectedIndex = 0;

                if(favoritos.length > 0 )
                {
                    hideElement(_btnMas)
                    document.getElementById("txtInput").value = ""
                    order = ""
                    search = ""
                    getCryptoById(favoritos.join(), order, maxItems, GetCriptoBy, currency, false)
                }
                else{
                    selectCategory.selectedIndex = 0;
                    alertify.error("No se tienen elementos Favoritos")
                }
            }
            else
            {//Alguna Categoria
                category = selectCategory.value
                getCriptoByCategory(selectCategory.value, order, -1, GetCriptoByCategory, currency)
            }
        }
    });


    //ORDEN
    selectOrder.addEventListener('change', (event) => {
        showElement(_btnMas)
        var selectOrder = document.getElementById("selectOrder");
        order = selectOrder.value.split(",")

        if (order[1] === "Sin orden" && search === "" && category === "") {
            getCriptoAll(order, -1, GetCriptoAll, currency)
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
            getCriptoByCategory(selectCategory.value, order, -1, GetCriptoByCategory, currency)
        }

        if (order[1] !== "Sin orden" && search == "" && category == "") {
            order = order[1]
            getCriptoAll(order, -1, GetCriptoAll)
        }
    });
}
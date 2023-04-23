import { ItemList } from "../components/itemList.js"
import { Header, eventSearch } from "../components/header.js"
import { Footer } from "../components/footer.js"
import { Card } from "../components/card.js"
import { itemListRoot } from "../components/itemListRoot.js"
import { getQueryParams } from "../functions.js"
import { getCriptoAll, getCriptoBy, getCriptoByCategory, GetCryptos} from "../services/indexServices.js"
import { getCategories } from "../services/categoriesServices.js"



var _items = document.getElementById("items");
var _header = document.getElementById("header");
var _footer = document.getElementById("footer");
var _sinResultados = document.getElementById("sinResultados");
var clase;
var checked;
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

                (idIsInLocalStorage(item.id)) ? checked = 'checked' : checked = '';

                _items.innerHTML +=Card(item.id, item.name, item.current_price, item.image, clase, checked) 
            });
        }
        else
        {
            _sinResultados.classList.remove("hide");
            _sinResultados.innerHTML = "No se han encontrado resultados para los datos ingresados";
        }

        //Selecciono los elementos que tengan la case fav 
        //y les agrego el evento del guardado en localstorage con jQuery
        $('.heart').each(function () {
            var fav = this;
            console.log(fav)
            fav.addEventListener('click', event => {
                var id = event.target.getAttribute("data-id");
                console.log(id)
                updateLocalStorage(id)
            });
        });

    }

  function hideElement(element)
  {
    if(!element.classList.contains("hide"))
    {
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
    console.log(localStorage.getItem("Favoritos"))
    console.log(`Buscar: ${id}`)
    console.log(index);
    (index > -1) ? // IndexOf retorna -1 en el caso de no encontrar un elemento
        favoritos.splice(index, 1) : //Elimino el elemento de la lista en el caso de que esté
        favoritos.push(id); // Añado en el caso que no esté

    favoritos.sort()
    // Guardo la lista de favoritos
    localStorage.setItem("Favoritos", JSON.stringify(favoritos));
}


/*const Hola = (result) => {
    console.log("holaaaaa")
   console.log(result.coins)
}
GetCryptos("bitcoin",Hola)
*/

const GetCriptoAll = (result) => {
    displayItems(result)
}

const GetCriptoBy = (result) =>
{
    displayItems(result);
}

const GetCriptoByCategory = (result)=>
{
    displayItems(result);
}

export const IndexRender = () => {
    _header.innerHTML=Header();
    _footer.innerHTML=Footer();
    eventSearch();
    
    var selectOrder = document.getElementById("selectOrder");
    var selectCategory = document.getElementById("selectCategory");
    var search = "";
    var order = "";
    var category = ""

    getCriptoAll(order, GetCriptoAll)

    //Busqueda
    document.getElementById("searchButton").addEventListener('click', event => {
        //Limpia los select
        selectOrder.selectedIndex  = 0;
        selectCategory.selectedIndex  = 0;
        order = "";

        search = document.getElementById("txtInput").value
        
        if(search === "")
        {                
            displayItems(result);
        }
        else
        {
            getCriptoBy(search, order, GetCriptoBy)
        }                
    });


    //Categorias
    selectCategory.addEventListener('change', (event) => {

        //Limpia el select de orden y el campo de busqueda
        document.getElementById("txtInput").value = ""
        selectOrder.selectedIndex  = 0;
        order = "";
        selectCategory = document.getElementById("selectCategory");
         
        //Ninguna
        if(selectCategory.value === "todas")
        {
            category = ""
            getCriptoAll(order, GetCriptoAll)
        }
        //Alguna
        else{
            category = selectCategory.value
            getCriptoByCategory(selectCategory.value, order, GetCriptoByCategory)
        }
    });


    //ORDEN
    selectOrder.addEventListener('change', (event) => {
        var selectOrder = document.getElementById("selectOrder");
        var order = selectOrder.value.split(",")

        if(order[1] === "Sin orden" && search === "" && category === "") 
        {
            getCriptoAll(order, GetCriptoAll)
        }
        
        if(order[1] !== "Sin orden" && search !== "" && category !== "") 
        {
            order = "";
            displayItems(result)
        }

        if (order[1] !== "Sin orden" && search !== "")
        {
            order = order[1]
            getCriptoBy(search, order,(result)=>
            {
                displayItems(result);
            })
        }

        if (order[1] !== "Sin orden" && category !== "")
        {
            order = order[1]
            getCriptoByCategory(category, order,(result)=>
            {
                displayItems(result);
            })
        }

        if (order[1] !== "Sin orden" && search == "" && category == "")
        {
            order = order[1]
            getCriptoAll(order, GetCriptoAll)
        }
        
        
    });

}
    
    /*
    getCriptoAll(order, result=>
    {
        console.log(result)
        //Inicialmente se muestran todos los resultados
        displayItems(result);
        https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=decentralized-finance-defi&per_page=10&page=1&sparkline=false&locale=en
        //Busqueda
        document.getElementById("searchButton").addEventListener('click', event => {
            
            //Limpia los select
            selectOrder.selectedIndex  = 0;
            selectCategory.selectedIndex  = 0;
            order = "";

            search = document.getElementById("txtInput").value
            
            if(search === "")
            {                
                displayItems(result);
            }
            else
            {
                getCriptoBy(search, order,(result)=>
                {
                    displayItems(result);
                })
            }                
        });

        
        

        //ORDEN
        selectOrder.addEventListener('change', (event) => {
            var selectOrder = document.getElementById("selectOrder");
            var order = selectOrder.value.split(",")

            if(order[1] === "Sin orden" && search === "" && category === "") 
            {
                getCriptoAll((order, result)=>
                {
                    displayItems(result)
                })
            }
            
            if(order[1] !== "Sin orden" && search !== "" && category !== "") 
            {
                order = "";
                displayItems(result)
            }

            if (order[1] !== "Sin orden" && search !== "")
            {
                order = order[1]
                getCriptoBy(search, order,(result)=>
                {
                    displayItems(result);
                })
            }

            if (order[1] !== "Sin orden" && category !== "")
            {
                order = order[1]
                getCriptoByCategory(category, order,(result)=>
                {
                    displayItems(result);
                })
            }
            
            
        });


        
        //buttonMoreResults.addEventListener('click', event => {
        //    hideElement(buttonMoreResults)
        //    lastItems = itemsOriginalCompleto
        //    lastItems = lastItems.filter(item => item.name.toLowerCase().includes(lastTextSearch.toLowerCase()));
        //    lastItemsFilter = lastItems
        //    lastItemsSearch = lastItems
        //    displayItems(lastItems);
        //});


        var buttons = document.querySelectorAll('.fav');
            buttons.forEach(button => button.addEventListener('click', event => {
                var id = event.target.getAttribute("data-id");
                console.log(id)
            }
            ));
        })
     */






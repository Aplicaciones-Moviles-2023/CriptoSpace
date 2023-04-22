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
    /*
    var historial = localStorage.getItem("historial").split(',')
    console.log(historial)
    if(historial.length <= 5)
    {
        historial.push("nuevo final")
    }
    else{
        historial.unshift("Principio")
    }
    var contentHistorial = ['hola','jojo']
    contentHistorial.unshift("jaja")
    localStorage.setItem("historial", contentHistorial)
    console.log("holaa")
    */
    getDetailCripto(id, (response) =>{
    
    let values = response.market_data.sparkline_7d.price
    let labels = []
    let data = []
    var todayDate = new Date();
    let cont = 0;
    for (let i = values.length; i >= 0; i--) {
        data.push(values[i])
        labels.push(todayDate.getUTCDate() + "/" + todayDate.getUTCMonth())
        cont++
        if (cont == 24) {
            cont = 0
            todayDate.setDate(todayDate.getDate() - 1);
        }
    }
    data.reverse()
    labels.reverse()
    let chart = document.getElementById("chart").getContext("2d")
    Chart.defaults.color = "rgba(255,255,255,0.7)";
    Chart.defaults.font.size = 14;
    var graph = new Chart(chart, {
        type: "line",

        borderColor: 'rgb(255, 213, 0)',
        title: {
            text: "Title in Red",
            fontColor: 'rgb(255, 213, 0)',
        },
        data: {
            labels: labels,
            datasets: [{
                label: response.name,
                backgroundColor: 'rgb(255, 213, 0)',
                borderColor: 'rgb(255, 213, 0)',
                data: data
            }]
        },
        options: {

            plugins: {
                title: {
                    display: true,
                    text: response.name + " (" + response.symbol.toUpperCase() + ")",
                    font: {
                        size: 20
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255,255,255,0)'
                    }
                }
            }
        }
    })
    })


    




    document.getElementById("searchButton").addEventListener('click', event => {
        var searchName = document.getElementById("txtInput").value
        location.href =`index.html?nameSearch=${searchName}`
    });


}


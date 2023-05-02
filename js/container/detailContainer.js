import { Header, eventSearch } from "../components/header.js"
import { Footer, startMap } from "../components/footer.js"
import { getQueryParams } from "../functions.js"
import { getDetailCripto } from "../services/DetailServices.js"
import { Form } from "../components/form.js"
import { Details } from "../components/details.js"
import { Modal } from "../components/modal.js"

var _header = document.getElementById("header");
var _footer = document.getElementById("footer");
var _form = document.getElementById("form");
var _root = document.getElementById("root");
var _modal = document.getElementById("modal")

export const DetailRender = () => {
    _header.innerHTML = Header();
    _footer.innerHTML = Footer();
    _form.innerHTML = Form();
    eventSearch();
    startMap();

    var id = getQueryParams().id

    getDetailCripto(id, (response) => {
        _root.innerHTML = Details(response);
        console.log(response)
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

        var nameCripto = document.getElementById("nameCripto")
        nameCripto.value = response.name

        var currentPrice = document.getElementById("currentPrice")
        currentPrice.value = response.market_data.current_price.usd+" USD"

        var coment = document.getElementById("messagge")
        var btnSend = document.getElementById("btnSend")

        btnSend.addEventListener('click', event => {

            var emailTo = document.getElementById("emailTo").value
            if (isEmail(emailTo)) {

                var date = new Date();
                var datetime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

                var message = `Criptomoneda: ${nameCripto.value}%0D%0APrecio Actual: ${currentPrice.value} USD%0D%0AFecha y Hora Actual: ${datetime}%0D%0A%0D%0A${coment.value}`
                btnSend.href = `mailto:${emailTo}?subject=CriptoSpace&body=${message}`
            }
            else {
                _modal.innerHTML = ""
                _modal.innerHTML += Modal('El email indicado NO es correcto. Por favor validar');
                var checkbox = $("#checkModal")[0]
                checkbox.checked = true;
            }
        });
    })
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
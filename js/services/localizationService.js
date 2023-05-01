let ApiKey = '88b4c82c31aa4076ab52191dbff421f5'
let BaseUrl = 'https://api.ipgeolocation.io'

export const getLocalizationInfo = (callback) => {
    var url = `https://api.ipgeolocation.io/ipgeo?apiKey=88b4c82c31aa4076ab52191dbff421f5`;
    fetch(url, {
        method: 'GET'
    }).then((httpResponse) => {
        if (httpResponse.ok)
            return httpResponse.json()
    })
        .then(body => {
            callback(body);
        })
}

export const getCurrencyInfo = (callback) => {
    var url = `https://api.ipgeolocation.io/ipgeo?apiKey=88b4c82c31aa4076ab52191dbff421f5`;
    //Obtengo la moneda
    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=88b4c82c31aa4076ab52191dbff421f5`, {
        method: 'GET'
    }).then((httpResponse) => {
        if (httpResponse.ok)
            return httpResponse.json()
    }).then(body => {
        if (CurrencyExists(body.currency.code.toLowerCase())) {
            callback(body.currency.code.toLowerCase());
        } else {
            callback('usd')
        }
    })
}
const CurrencyExists = (currency) => {
    var currencies = JSON.parse(localStorage.getItem("Currencies"))
    return currencies.includes(currency)
}
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
export const CurrencyExists = (currency) => {
    var currencies = [
        "btc",
        "eth",
        "ltc",
        "bch",
        "bnb",
        "eos",
        "xrp",
        "xlm",
        "link",
        "dot",
        "yfi",
        "usd",
        "aed",
        "ars",
        "aud",
        "bdt",
        "bhd",
        "bmd",
        "brl",
        "cad",
        "chf",
        "clp",
        "cny",
        "czk",
        "dkk",
        "eur",
        "gbp",
        "hkd",
        "huf",
        "idr",
        "ils",
        "inr",
        "jpy",
        "krw",
        "kwd",
        "lkr",
        "mmk",
        "mxn",
        "myr",
        "ngn",
        "nok",
        "nzd",
        "php",
        "pkr",
        "pln",
        "rub",
        "sar",
        "sek",
        "sgd",
        "thb",
        "try",
        "twd",
        "uah",
        "vef",
        "vnd",
        "zar",
        "xdr",
        "xag",
        "xau",
        "bits",
        "sats"
    ]
    return currencies.includes(currency)
}
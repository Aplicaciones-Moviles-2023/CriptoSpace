let ApiKey = '88b4c82c31aa4076ab52191dbff421f5'
let BaseUrl = 'https://api.ipgeolocation.io'

export const getLocalizationInfo = (callback) => {
    var url = `${BaseUrl}/ipgeo?apiKey=${ApiKey}`;
    var res = fetch(url)
        .then(response => response.json())
        .then(body => {
            callback(body)
        })
}
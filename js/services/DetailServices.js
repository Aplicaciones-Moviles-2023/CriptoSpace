const urlBase = "https://api.coingecko.com/api/v3";

export const getDetailCripto = (id, callback) => {
    var url = `${urlBase}/coins/${id}?market_data=true&community_data=false&developer_data=false&sparkline=true`;
    
    var res = fetch(url)
        .then(response => response.json())
        .then(body => {
        callback(body)
    })
}
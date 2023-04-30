export const getQueryParams = () =>
{
    var urlParams;
    var match,
        pl     = /\+/g,
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);
  
    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
       return urlParams;
};

export const searchJsonId = (json, id) =>
{
    var indiceEncontrado = json.findIndex(function(item) {
        return item.id === id;
    });
    console.log(indiceEncontrado);

    return indiceEncontrado;
}

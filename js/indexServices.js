const urlBase = "https://localhost:7233/api";

export const getCategories = (callback) => {
    //var url = `${urlBase}/Productos?name=${nombre}&sort=${sort}`;
    
    var res = [
        {
          "category_id": "aave-tokens",
          "name": "Aave Tokens"
        },
        {
          "category_id": "algorand-ecosystem",
          "name": "Algorand Ecosystem"
        }]
    
    callback(res)


    /*fetch(url)
        .then(response => response.json())
        .then(body => {
            callback(body)
        })
    */
    }

/*export const getProductsByName = (nombre, sort, callback) => {
    var url = `${urlBase}/Productos?name=${nombre}&sort=${sort}`;
    fetch(url)
        .then(response => response.json())
        .then(body => {
            callback(body)
        })
    }
    */
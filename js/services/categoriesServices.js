const urlBase = "https://api.coingecko.com/api/v3";

export const getCategories = (callback) => {
    var url = `${urlBase}/coins/categories/list`;

    //Esto trae desde la API
    //fetch(url)
    //  .then(response => response.json())
    //  .then(body => {
    //    callback(body.slice(0,3))
    //  })

    //Datos puestos a mano
    callback ([{
      "category_id": "aave-tokens",
      "name": "Aave Tokens"
    },
    {
      "category_id": "algorand-ecosystem",
      "name": "Algorand Ecosystem"
    }])

  }
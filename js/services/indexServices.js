const urlBase = "https://api.coingecko.com/api/v3";
const maxResult = 6;

//Se obtienen TODAS las criptomonedas segun un orden(opcional)
export const getCriptoAll = (order, maxItems, callback) => {
    if(maxItems === -1)
    {
        maxItems = maxResult
    }

    var orderUrl = ""
    if(order !== "")
    {
        orderUrl = "&order=price_"+order;
    }
    
    var key = `getCriptoAll-${order}-${maxItems}`
    
    //Intenta obtener la respuesta desde la cache
    caches.match(key).then(function(response) {
        if (response) {
            response.text().then(function(texto) {
                console.log('Recibido desde la Cache');
                callback(JSON.parse(texto))
        });
        } 
        else {
            console.log('No se encontró el archivo en la caché');
            caches.open('cache').then(function(cache) {
                //Busca la respuesta en la API
                var url = `${urlBase}/coins/markets?vs_currency=usd${orderUrl}&per_page=${maxItems}&page=1&sparkline=false&community_data=false&developer_data=false`;

                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };

                fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        cache[key] = result ;
                        console.log('Recibido desde la API');
                        //Guarda el resultado en la cache para proximos usos
                        cache.put(key, new Response(JSON.stringify(result)))
                        callback(result)
                    })
                    .catch(error => console.log('error', error));
            });
            console.log('dato agregado a la cache');
        }
    });          
}


export const getCriptoBy = (search, order, maxItems, callback) => {

    if(maxItems === -1)
    {
        maxItems = maxResult
    }

    var url = `${urlBase}/search?query=${search}&community_data=false&developer_data=false`;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            result = Array.from(result.coins).slice(0,maxItems)
            var criptos =[]
            result.forEach(coin => {
                criptos.push(coin.id)
            });
            
            criptos = criptos.toString()
            getCryptoById(criptos, order, maxItems,(result)=>
            {
                callback(result);
            })
            callback(result)
        })
        .catch(error => console.log('error', error));
}
    


export const getCryptoById = (cryptoId, order, maxItems, callback) => {

    if(maxItems === -1)
    {
        maxItems = maxResult
    }

    var orderUrl = ""
    if(order !== "")
    {
        orderUrl = "&order=price_"+order;
    }
    var urlIds = "&ids="+cryptoId;

    var key = `getCryptoById-${cryptoId}-${order}-${maxItems}`

    //Intenta obtener la respuesta desde la cache
    caches.match(key).then(function(response) {
        if (response) {
            response.text().then(function(texto) {
                console.log('Recibido desde la Cache:');
                callback(JSON.parse(texto))
        });
        } 
        else {
            caches.open('cache').then(function(cache) {
                
                var url = `${urlBase}/coins/markets?vs_currency=usd${orderUrl}${urlIds}&per_page=${maxItems}&page=1&sparkline=false&community_data=false&developer_data=false`;
                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };

                fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        cache[key] = result ;
                        console.log('Recibido desde la API');
                        cache.put(key, new Response(JSON.stringify(result)))
                        callback(result)
                    })
                    .catch(error => console.log('error', error));
            });
            console.log('Dato agregado a la cache');
        }
    });
}



export const getCriptoByCategory = (category, order, maxItems, callback) => {
    if(maxItems === -1)
    {
        maxItems = maxResult
    }
    var orderUrl = ""
    if(order !== "")
    {
        orderUrl = "&order=price_"+order;
    }

    var key = `getCriptoByCategory-${category}-${order}-${maxItems}`
    console.log(key)

    //Intenta obtener la respuesta desde la cache
    caches.match(key).then(function(response) {
        if (response) {
            response.text().then(function(texto) {
                console.log('Recibido desde la Cache');
                callback(JSON.parse(texto))
        });
        } 
        else {
            caches.open('cache').then(function(cache) {
                var url = `${urlBase}/coins/markets?vs_currency=usd&category=${category}${orderUrl}&per_page=${maxItems}&page=1&sparkline=false&locale=en&community_data=false&developer_data=false`;

                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };

                fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        cache[key] = result ;
                        console.log('Recibido desde la API');
                        cache.put(key, new Response(JSON.stringify(result)))
                        callback(result)
                    })
                    .catch(error => console.log('error', error));
            });
            console.log('dato agregado a la cache');
        }
    });  
}


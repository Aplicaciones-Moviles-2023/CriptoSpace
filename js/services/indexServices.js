const urlBase = "https://api.coingecko.com/api/v3";
const maxResult = 8

const cache = {};
const cacheTTL = 120; // tiempo de vida del caché en segundo


export const GetCryptos = (search, callback) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`${urlBase}/search?query=${search}`, requestOptions)
        .then(response => response.json())
        .then(result => callback(result))
        .catch(error => console.log('error', error));
}


export const getCriptoAll = (order, callback) => 
{
    var orderUrl = ""
    if(order !== "")
    {
        orderUrl = "&order=price_"+order;
    }
    
    var key = `getCriptoAll-${order}`
    
    //Intenta obtener el archivo desde la cache
    caches.match(key).then(function(response) {
        if (response) {
            response.text().then(function(texto) {
                console.log('Contenido de archivo almacenado en caché:', JSON.parse(texto));
                callback(JSON.parse(texto))
        });
        } 
        else {
            console.log('No se encontró el archivo en la caché');
            caches.open('cache').then(function(cache) {
                var url = `${urlBase}/coins/markets?vs_currency=usd${orderUrl}&per_page=${maxResult}&page=1&sparkline=false`;

                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };

                fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        cache[key] = result ;
                        console.log(cache[key])
                        console.log('RECIBIDO DESDE LA API');
                        console.log(result)
                        cache.put(key, new Response(JSON.stringify(result)))
                        callback(result)
                    })
                    .catch(error => console.log('error', error));
            });
            console.log('dato agregado a la cache');
        }
    });          
}


export const getCriptoBy = (search, order, callback) => {
    var url = `${urlBase}/search?query=${search}`;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`${urlBase}/search?query=${search}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            result = Array.from(result.coins).slice(0,maxResult)
            var criptos =[]
            
            result.forEach(coin => {
                criptos.push(coin.id)
            });
            
            criptos = criptos.toString()

            getCryptoById(criptos,order,(result)=>
            {
                callback(result);
            })
            callback(result)
        })
        .catch(error => console.log('error', error));
}
    


export const getCryptoById = (cryptoId, order, callback) => {

    var orderUrl = ""
    if(order !== "")
    {
        orderUrl = "&order=price_"+order;
    }

    var urlIds = "&ids="+cryptoId;

    var key = `getCryptoById-${cryptoId}-${order}`
    console.log("KEEEEY")
    console.log(key)
    //Intenta obtener el archivo desde la cache
    caches.match(key).then(function(response) {
        if (response) {
            response.text().then(function(texto) {
                console.log('Contenido de archivo almacenado en caché:', JSON.parse(texto));
                callback(JSON.parse(texto))
        });
        } 
        else {
            console.log('No se encontró el archivo en la caché');
            caches.open('cache').then(function(cache) {
                
                var url = `${urlBase}/coins/markets?vs_currency=usd${orderUrl}${urlIds}&per_page=${maxResult}&page=1&sparkline=false`;                
                console.log(url)
                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };

                fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        cache[key] = result ;
                        console.log(cache[key])
                        console.log('RECIBIDO DESDE LA API');
                        console.log(result)
                        cache.put(key, new Response(JSON.stringify(result)))
                        callback(result)
                    })
                    .catch(error => console.log('error', error));
            });
            console.log('dato agregado a la cache');
        }
    });
}



export const getCriptoByCategory = (category, order, callback) => {
    var orderUrl = ""
    if(order !== "")
    {
        orderUrl = "&order=price_"+order;
    }
    var url = `${urlBase}/coins/markets?vs_currency=usd&category=${category}${orderUrl}&per_page=${maxResult}&page=1&sparkline=false&locale=en`;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => callback(result))
        .catch(error => console.log('error', error));
}













    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    










    


















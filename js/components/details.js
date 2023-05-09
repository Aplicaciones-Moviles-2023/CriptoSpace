export const Details = (cripto) => `
    <section id="details">
        <h2> Detalles <h2> 
        <ul>
            <li> Precio Actual: ${cripto.market_data.current_price.usd + " USD"} </li>
            <li> Market Cap: ${cripto.market_data.market_cap.usd + " USD"} </li>
            <li> Cambio en las ultimas 24 hs: ${cripto.market_data.price_change_24h} </li>
        </ul>
    </section>
`
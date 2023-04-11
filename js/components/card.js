export const Card = (id, nombre, precio, image,clase) => `
    <div class = "card ${clase}">
        <img src = ${image}> 
        <div class="texto">
            <label class="titleCard"> ${nombre} </label>
            <label class="precioCard"> $${precio} </label>
        </div>
        <div id="buttonCard">
            <button class="verDetalle" id=${id}
            data-id = ${id}>
                Ver detalle
            </button>
        </div> 
    </div>
`
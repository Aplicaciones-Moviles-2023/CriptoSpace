export const Card = (id, nombre, precio, image, clase, favChecked) => `
    <div class = "card ${clase}">
        <img src = ${image}> 
        <div class="texto">
            <label class="titleCard"> ${nombre} </label>
            <label class="precioCard"> $${precio} </label>
        </div>
        <div id="buttonCard">
            <button class="verDetalle" id=${id}
            data-id = ${id}
            onclick="location.href='../view/detail.html?id=${id}'">
                Ver detalle
            </button>
        </div> 

        <input id="${id}-fav" class="heart" data-id = ${id} type="checkbox" ${favChecked}/>
        <label for="${id}-fav">❤</label>
        
    </div>
`

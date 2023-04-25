export const Card = (id, nombre, precio, image, clase, favChecked) => `
    <div class="carta ${clase}">
        <img src = ${image}>
        <div class="texto">
            <label class="titleCard"> ${nombre} </label>
            <label class="precioCard"> $${precio} </label>
        </div>
        <div > 
            <input id="${id}-fav" class="heart" data-id = ${id} type="checkbox" ${favChecked}/>
            <label for="${id}-fav">❤</label>
        
            <div id="buttonCard">
                <a class="viewMore" href='../view/detail.html?id=${id}'>+</a>
            </div>
        </div>
    </div>



`

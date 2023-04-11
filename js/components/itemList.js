export const ItemList = (id, nombre) => `
    <li>
    <div id="buttonCard">
        <a class="verDetalle" id="btn+"${id} href="#${id}"
        data-id = ${id}>
            ${nombre}
        </a>
    </div> 
    </li>
`



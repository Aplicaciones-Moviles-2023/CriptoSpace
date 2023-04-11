export const ProductoCarrito = (productoId, nombre, precio, cantidad, image) => `
    <article> 
        <div id="imagen">
            <img src = "${image}"> 
        </div>
        <label id="titulo"> ${nombre} </label>
        <div id = "cantidad">
            <button class="btnMasMenos restar" data-productoId = ${productoId}>-</button> <label id="valorCantidad_${productoId}"> ${cantidad} </label> <button class="btnMasMenos sumar" data-productoId = ${productoId}>+</button>
        </div>
        <div id="precio"> $${precio} </div>
        <div id="botones"> <button class="eliminar" data-productoId=${productoId}> <ion-icon name="trash-outline"></ion-icon> </button> </div>
    </article>
`


export const Form = (id, nombre, precio, image, clase, favChecked) => `
<form id="form">
    <p>
    Criptomoneda: <input disabled type="text" id="nameCripto">
    </p>
    <p>
    Precio Actual: <input disabled type="text" id="currentPrice">
    </p>
    <p>
    Direccion de correo electronico a enviar: <input type="text" id="emailTo">
    </p>
    <p>
    Comentarios: 
    <textarea rows = "5" cols = "40" id = "coment"> </textarea>
    </p>
    <a id="btnSend" target="_blank"> Enviar Email <ion-icon name="mail-outline"></ion-icon></a>
</form>
`



export const Form = (id, nombre, precio, image, clase, favChecked) => `
<form id="form">
    <h3> Criptomoneda:</h3>
    <input disabled type="text" id="nameCripto">
    <h3>Precio Actual:</h3>
    <input disabled type="text" id="currentPrice">
    <h3>Email:</h3>
    <input type="text" id="emailTo">
    <h3>Comentarios:</h3>
    <textarea rows = "5" cols = "40" id = "coment"> </textarea>
    <a id="btnSend" target="_blank"> Enviar Email <ion-icon name="mail-outline"></ion-icon></a>
</form>
`
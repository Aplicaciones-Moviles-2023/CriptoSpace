export const Form = (id, nombre, precio, image, clase, favChecked) => `
<form id="form">
    <h1> Compartir a un amigo <h1>
    <h3> Criptomoneda:</h3>
    <input disabled type="text" class="form-input dissabled" id="nameCripto">
    <h3>Precio Actual:</h3>
    <input disabled type="text" class="form-input dissabled" id="currentPrice">
    <h3>Email Amigo:</h3>
    <input type="text" class="form-input" id="emailTo">
    <h3>Mensaje:</h3>
    <textarea rows = "5" cols = "40" id = "messagge"> </textarea>
    <a id="btnSend" target="_blank"> Enviar Email <ion-icon name="mail-outline" class="icon-email"></ion-icon></a>
</form>
`
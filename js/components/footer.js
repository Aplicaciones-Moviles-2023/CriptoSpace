export const Footer = () => {
    return `
        <footer class="pie-pagina">
        <div class="grupo-1">
            <div class="box">
                <figure>
                    <a href="index.html">
                        <img src="../../img/logo.png">
                    </a>
                </figure>
            </div>
            <div id="map"></div>
            <div class="box">
                <h2>SOBRE NOSOTROS</h2>
                <p>Somos un equipo de profesionales en el mundo Cripto</p>
                <p>Contamos con experiencia en el mercado y clientes que nos avalan</p>
            </div>
            <div class="box">
                <h2>SIGUENOS</h2>
                <div class="red-social">
                    <a target="_blank" class="itemFooter"href="mailto:diloretoignacio@gmail.com?Subject=Mensaje desde el Ecommerce"> <ion-icon name="mail-outline"></ion-icon></a>
                    <a target="_blank" class="itemFooter" href="https://api.whatsapp.com/send?phone=+5491158256629&text=Mensaje desde el Ecommerce"> <ion-icon name="logo-whatsapp"></ion-icon></a>
                    <a class="itemFooter" href="#"> <ion-icon name="logo-facebook"></ion-icon></a>
                    <a class="itemFooter" href="#"> <ion-icon name="logo-instagram"></ion-icon></a>
                </div>
            </div>
        </div>
        <div class="grupo-2">
            <small>&copy; 2023 <b>Cripto Space</b> - Todos los Derechos Reservados.</small>
        </div>
        </footer>
        `
    }

export const startMap = () => {
    var coord = {lat:-34.5956145 ,lng: -58.4431949};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}
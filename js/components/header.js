export const Header = () => {
    return `  
    <nav class="nav">
        <input type="checkbox" id="nav_checkbox" class="nav_checkbox">
        <label for="nav_checkbox" class="nav_toggle">
            <svg class="menu" viewBox="0 0 100 80" width="40" title="bars">
                <rect width="100" height="20"></rect>
                <rect y="30" width="100" height="20"></rect>
                <rect y="60" width="100" height="20"></rect>
            </svg>
            <svg class="close" viewBox="0 0 384 512" width="100" title="times">
                <path
                    d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
            </svg>
        </label>
        <ul class="nav_menu">
            <li><a href="index.html">
                    Cripto Space
                </a></li>
            <li class="search">
                <input type="text" placeholder="Buscar producto" id="txtInput">
                <label id="searchButton"> <ion-icon name="search-outline"></ion-icon> </label>
            </li>
            <li><a href="#">Contacto</a></li>
        </ul>
    </nav>
    `
}

export const Search = () => {
    //    document.getElementById("form").addEventListener('submit', function(e){
    //        e.preventDefault();
    //        document.getElementById("searchButton").click()
    //    });
    }
    
    export const eventSearch = () => {
        var txtInput = document.getElementById('txtInput'); 
        txtInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                document.getElementById("searchButton").click()
            }
        });
    }




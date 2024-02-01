import "./Footer.scss";

function Footer(){
    return(
        <footer>
            <ul className="no-display-on-mobile">
                <li><a>Accueil</a></li>
                <li><a>Bulbes</a></li>
                <li><a>Rosiers</a></li>
                <li><a>Plantes à massif</a></li>
                <li><a>Contact</a></li>
            </ul>
            <p>Développé par Robin Simonneau, Rujdy Hasni, Bilel Taieb.</p>
            <p>Fleurtissimo © 2024</p>

        </footer>
    )
}

export default Footer;
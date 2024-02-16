import "./Footer.scss";
import {Link} from "react-router-dom";

function Footer(){
    return(
        <footer>
            <ul className="no-display-on-mobile">
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/bulbes">Bulbes</Link></li>
                <li><Link to="/rosiers">Rosiers</Link></li>
                <li><Link to="/plantes-a-massif">Plantes à massif</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
            <p>Développé par Robin Simonneau, Rujdy Hasni, Bilel Taieb.</p>
            <p>Fleurtissimo © 2024 v0.0.2</p>

        </footer>
    )
}

export default Footer;
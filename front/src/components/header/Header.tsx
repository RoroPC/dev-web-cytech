import "./Header.scss";
import logo from "../../assets/images/logo.png";
import {useState} from "react";
import {Link} from "react-router-dom";
function Header(){
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };
    return(
        <header>
            <div id="logo">
                <img alt="logo" src={logo}/>
            </div>
            <ul className="no-display-on-mobile">
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/bulbes">Bulbes</Link></li>
                <li><Link to="/rosiers">Rosiers</Link></li>
                <li><Link to="/plantes-a-massif">Plantes à massif</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
            <button className="no-display-on-desktop mobile-menu-button" onClick={toggleMobileMenu}>
               <span className="burger-icon">
                    <span></span>
                    <span></span>
                    <span></span>
              </span>
            </button>
            <ul className={`${isMobileMenuOpen ? 'open-menu' : 'close-menu'}`}>
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/bulbes">Bulbes</Link></li>
                <li><Link to="/rosiers">Rosiers</Link></li>
                <li><Link to="/plantes-a-massif">Plantes à massif</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </header>
    )
}

export default Header;

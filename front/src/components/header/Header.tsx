import "./Header.scss";
import logo from "../../../public/logo.png";
import {useState} from "react";
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
                <li><a>Accueil</a></li>
                <li><a>Bulbes</a></li>
                <li><a>Rosiers</a></li>
                <li><a>Plantes à massif</a></li>
                <li><a>Contact</a></li>
            </ul>
            <button className="no-display-on-desktop mobile-menu-button" onClick={toggleMobileMenu}>
               <span className="burger-icon">
                    <span></span>
                    <span></span>
                    <span></span>
              </span>
            </button>
            <ul className={`${isMobileMenuOpen ? 'open-menu' : 'close-menu'}`}>
            <li><a>Accueil</a></li>
                <li><a>Bulbes</a></li>
                <li><a>Rosiers</a></li>
                <li><a>Plantes à massif</a></li>
                <li><a>Contact</a></li>
            </ul>
        </header>
    )
}

export default Header;

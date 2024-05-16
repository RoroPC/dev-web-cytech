import "./Header.scss";
import logo from "../../assets/images/logo.png";
import {useState} from "react";
import {Link} from "react-router-dom";
import {BASE_URL} from "../../services/api/api.ts";
import  {useUser} from "../../contexts/user";
function Header(){
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const currentUser = useUser()

    const [isConnectedState,setIsConnectedState] = useState(currentUser.userData !== null);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };
    const { setUserData } = useUser();

    //TODO Régler le problème de déconnexion
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
                <li className={`${isConnectedState ? 'connected' : 'non-connected'}`}><Link to="/login">Connexion</Link>
                </li>
                <li className={`${isConnectedState ? 'connected' : 'non-connected'}`}><Link to="/register">Inscription</Link>
                </li>
                <li className={`${isConnectedState ? 'non-connected' : 'connected'}`}><a
                    onClick={() => {
                        fetch(BASE_URL + "/logout", {method: "POST", credentials: "include"}).then(() => {
                            setUserData(null);
                            setIsConnectedState(false);
                        });
                    }}>Déconnexion</a></li>
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
                <li className={`${isConnectedState ? 'connected' : 'non-connected'}`}><Link to="/login">Connexion</Link>
                </li>
                <li className={`${isConnectedState ? 'connected' : 'non-connected'}`}><Link to="/register">Inscription</Link>
                </li>
                <li className={`${isConnectedState ? 'non-connected' : 'connected'}`}><a
                    onClick={() => {
                        fetch(BASE_URL + "/logout", {method: "POST", credentials: "include"}).then(() => {
                            setUserData(null);
                            setIsConnectedState(false);
                        });
                    }}>Déconnexion</a></li>

            </ul>
        </header>
    )
}

export default Header;

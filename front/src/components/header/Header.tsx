import "./Header.scss";
import logo from "../../assets/images/logo.png";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {BASE_URL, BASE_URL_WITHOUT_API} from "../../services/api/api.ts";
import  {useUser} from "../../contexts/user";
import { IoCart } from "react-icons/io5";

function Header(){
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { setUserData,userData } = useUser();

    const [isConnectedState,setIsConnectedState] = useState((userData !== undefined && userData !== null));
    useEffect(() => {
        setIsConnectedState((userData !== undefined && userData !== null))
    }, [userData]);

    const [isAdmin,setIsAdmin ] = useState(false);
    useEffect(() => {
        if (userData?.isAdmin){
            setIsAdmin(userData.isAdmin)
        }
        console.log("isAdmin"+isAdmin)
        console.log(userData?.isAdmin)
    }, [userData]);

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
                <li className={`${isConnectedState ? 'connected' : 'non-connected'}`}><Link to="/login">Connexion</Link>
                </li>
                <li className={`${isConnectedState ? 'connected' : 'non-connected'}`}><Link
                    to="/register">Inscription</Link>
                </li>
                <li className={`${isConnectedState ? 'non-connected' : 'connected'}`}><a
                    onClick={() => {
                        fetch(BASE_URL + "/logout", {method: "POST", credentials: "include"}).then(() => {
                            setUserData(null);
                            setIsConnectedState(false);
                        });
                    }}>Déconnexion</a></li>
                <li className={"cart-link"}><Link to="/cart"><IoCart/></Link></li>
                {isAdmin && <li ><a href={BASE_URL_WITHOUT_API+"/admin/"} target="_blank">Panel Administrateur</a></li>}
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
                <li className={`${isConnectedState ? 'connected' : 'non-connected'}`}><Link
                    to="/register">Inscription</Link>
                </li>
                <li className={`${isConnectedState ? 'non-connected' : 'connected'}`}><a
                    onClick={() => {
                        fetch(BASE_URL + "/logout", {method: "POST", credentials: "include"}).then(() => {
                            setIsConnectedState(false);
                            setUserData(null);
                        });
                    }}>Déconnexion</a></li>
                <li><Link to="/cart">Panier</Link></li>
                {isAdmin && <li ><a href={BASE_URL_WITHOUT_API+"/admin/"} target="_blank">Panel Administrateur</a></li>}


            </ul>
        </header>
    )
}

export default Header;

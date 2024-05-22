import "./LoginPage.scss";
import {useState} from "react";
import {BASE_URL} from "../../../services/api/api.ts";
import Cookies from 'js-cookie'
import {useUser} from "../../../contexts/user";
import {getMe} from "../../../services/api/users.ts";



function LoginPage(){
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { setUserData } = useUser();

    return(
        <main>
            <h1>Connexion</h1>
            <form id="login" onSubmit={(event)=>{
                event.preventDefault();
                if (email != "" && password != ""){
                    const crsfCookie = Cookies.get("csrftoken");
                    const body = {
                        email:email,
                        password:password,
                        csrfmiddlewaretoken:crsfCookie,
                    }

                    fetch(BASE_URL+'/login',{
                        method:'POST',
                        headers:{"Content-Type": "application/json"},
                        body: JSON.stringify(body),
                        credentials:"include",
                    }).then((response)=>{
                        if (response.status != 201 && response.status != 200){
                            setErrorMessage("Email ou mot de passe incorrecte !")
                        }else{
                            setIsLoggedIn(true);
                            getMe().then((user) => {
                                setUserData(user);
                            });
                        }
                    })
                }
            }} className="login__form">
                <label htmlFor="register-email">Adresse email : </label>
                <input type="email" id="register-email" onChange={(event)=>{
                    setEmail(event.target.value);
                }} name="email"/>
                <label htmlFor="register-password">Mot de passe : </label>
                <input type="password" id="register-password" onChange={(event) => {
                    setPassword(event.target.value);
                    if (password.length<7 ){
                        setErrorMessage("Le mot de passe doit contenir au moins 8 caractères.");
                    }else{
                        setErrorMessage("")
                    }
                }} name="password"/>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {isLoggedIn && <p style={{color: 'green'}}>Vous avez bien été connecté !</p>}
                <button type="submit">Connexion</button>
            </form>
        </main>
    )
}

export default LoginPage;
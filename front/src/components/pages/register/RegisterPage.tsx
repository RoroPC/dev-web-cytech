import "./RegisterPage.scss";
import {useState} from "react";
import {BASE_URL} from "../../../services/api/api.ts";

//import {BASE_URL} from "../../../services/api/api.ts";

function RegisterPage(){
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


    return(
        <main>
            <h1>Inscription</h1>
            <form id="user"  method="POST" onSubmit={(event)=>{
                event.preventDefault()
                if (firstname != "" && lastname != "" && email != "" && password != "") {
                    const body = {
                        username:email,
                        email:email,
                        firstName:firstname,
                        lastName:lastname,
                        password: password
                    }
                    fetch(BASE_URL+'/register',{
                        method:'POST',
                        headers:{"Content-Type": "application/json"},
                        body:JSON.stringify(body)
                    }).then((response)=>{
                        if (response.status != 201){
                            console.error("Erreur lors de la création de l'utilisateur");
                            setErrorMessage("Une erreur à eu lieu lors de la création de l'utilisateur !")
                        }else{
                            setSuccessMessage("Vous avez bien été inscrit !")
                        }
                    })
                }else{
                    setErrorMessage("Les champs doivent tous être remplis !")
                }
            }}>
                <label htmlFor="register-last_name">Nom : </label>
                <input type="text" id="register-last_name" name="lastName" onChange={(event)=>{
                    setLastname(event.target.value);
                }}/>
                <label htmlFor="register-first_name">Prénom : </label>
                <input type="text" id="register-first_name" name="firstName" onChange={(event)=>{
                    setFirstname(event.target.value);
                }}/>

                <label htmlFor="register-email">Adresse email : </label>
                <input type="email" id="register-email" onChange={(event)=>{
                    setEmail(event.target.value);
                }} name="email"/>
                <label htmlFor="register-password">Mot de passe : </label>
                <input type="password" id="register-password" onChange={(event) => {
                    setPassword(event.target.value);
                    if (password.length<7){
                        setErrorMessage("Le mot de passe doit contenir au moins 8 caractères.");
                    }else{
                        setErrorMessage("")
                    }
                }} name="password"/>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                <button type="submit" >Inscription</button>
            </form>
        </main>
    )
}

export default RegisterPage;
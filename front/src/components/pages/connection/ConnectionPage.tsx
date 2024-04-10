import "./ConnectionPage.scss";

function ConnectionPage(){


    return(
        <main>
            <h1>Connexion</h1>
            <form>
                <label htmlFor="connection-email-input">Adresse email : </label>
                <input type="email" id="connection-email-input"/>
                <label htmlFor="connection-password-input">Mot de passe : </label>
                <input type="password" id="connection-password-input"/>
                <button type="submit" >Connexion</button>
            </form>
        </main>
    )
}

export default ConnectionPage;
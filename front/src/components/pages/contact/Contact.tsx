import "./Contact.scss"
import illustration from '../../../assets/images/contact_img.svg';
import {useState} from "react";
function Contact(){
    const presentDay = new Date();
    const [stringDate,] = useState(presentDay.getFullYear() + "-" + presentDay.getMonth() + "-" + presentDay.getDay());
    return(
        <main>
           <h1>Demande de contact</h1>
            <div className={"contact__form"}>
                <img className={"contact__img"} src={illustration} alt={"Illustration image"}/>
                <form name={"contact-form"} method={"POST"}>
                    <div className={"contact__input"}>
                        <label htmlFor="first-name">Prénom</label>
                        <input name={"first-name"} placeholder={"Entrez votre prénom"}/>
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="last-name">Nom</label>
                        <input name={"last-name"} placeholder={"Entrez votre nom"}/>
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="mail">Email</label>
                        <input name={"mail"} type={"email"} placeholder={"monmail@monsite.org"}/>
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="gender">Genre</label>
                        <div className={"contact__radio__button"}>
                            <div>
                                <label htmlFor="gender">Homme</label>
                                <input name={"gender"} type={"radio"}/>
                            </div>
                            <div>
                                <label htmlFor="gender">Femme</label>
                                <input name={"gender"} type={"radio"}/>
                            </div>
                        </div>
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="birthday">Date de naissance</label>
                        <input name={"birthday"} type={"date"} placeholder={"jj/mm/aaaa"}/>
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="function">Fonction</label>
                        <select name={"function"}>
                            <option value={""}>-- Sélectionner une option --</option>
                            <option value={"teacher"}>Enseignant</option>
                            <option value={"student"}>Etudiant</option>
                            <option value={"other"}>Autre</option>
                        </select>
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="subject">Sujet</label>
                        <input name={"subject"} placeholder={"Entrez le sujet de votre mail"}/>
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="content">Contenu</label>
                        <input name={"content"} type={"text"} placeholder={"Tapez ici votre mail"}/>
                    </div>
                    <input name={"contact-date"} type={"date"} value={stringDate} hidden readOnly />
                    <input name={"submit"} type={"submit"} value={"Envoyer"}/>
                </form>
            </div>
        </main>
    )
}

export default Contact;
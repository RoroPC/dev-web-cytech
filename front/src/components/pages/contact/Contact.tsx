import "./Contact.scss"
import illustration from '../../../assets/images/contact_img.svg';
import {useState} from "react";
function Contact(){
    const presentDay = new Date();
    const month = presentDay.getMonth() < 10 ? "0"+presentDay.getMonth() : presentDay.getMonth().toString();
    const day = presentDay.getDay() < 10 ? "0"+presentDay.getDay() : presentDay.getDay().toString()

    const [stringDate,] = useState(presentDay.getFullYear() + "-" + month + "-" + day);
    return(
        <main>
           <h1>Demande de contact</h1>
            <div className={"contact__form"}>
                <img className={"contact__img"} src={illustration} alt={"Illustration image"}/>
                <form name={"contact-form"} method={"POST"}>
                    <div className={"contact__input"}>
                        <label htmlFor="first-name">Prénom</label>
                        <input name={"first-name"} placeholder={"Entrez votre prénom"} required/>
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="last-name">Nom</label>
                        <input name={"last-name"} placeholder={"Entrez votre nom"} required/>
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="mail">Email</label>
                        <input name={"mail"} type={"email"} placeholder={"monmail@monsite.org"} required/>
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="gender">Genre</label>
                        <div className={"contact__radio__button"}>
                            <div>
                                <label htmlFor="gender">Homme</label>
                                <input name={"gender"} type={"radio"} required/>
                            </div>
                            <div>
                                <label htmlFor="gender">Femme</label>
                                <input name={"gender"} type={"radio"} required/>
                            </div>
                        </div>
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="birthday">Date de naissance</label>
                        <input name={"birthday"} type={"date"} placeholder={"jj/mm/aaaa"} required/>
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="function">Fonction</label>
                        <select name={"function"} required>
                            <option value={""}>-- Sélectionner une option --</option>
                            <option value={"teacher"}>Enseignant</option>
                            <option value={"student"}>Etudiant</option>
                            <option value={"other"}>Autre</option>
                        </select>
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="subject">Sujet</label>
                        <input name={"subject"} placeholder={"Entrez le sujet de votre mail"} required/>
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="content">Contenu</label>
                        <input name={"content"} type={"text-box"} placeholder={"Tapez ici votre mail"}/>
                    </div>
                    <input name={"contact-date"} type={"date"} value={stringDate} hidden readOnly required/>
                    <input className={"contact__submit__btn"} name={"submit"} type={"submit"} value={"Envoyer"}/>
                </form>
            </div>
        </main>
    )
}

export default Contact;
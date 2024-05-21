import "./Contact.scss"
import illustration from '../../../assets/images/contact_img.svg';
import {useEffect, useState} from "react";
import {BASE_URL} from "../../../services/api/api.ts";
function Contact(){
    const presentDay = new Date();
    const month = presentDay.getMonth() < 10 ? "0"+presentDay.getMonth() : presentDay.getMonth().toString();
    const day = presentDay.getDay() < 10 ? "0"+presentDay.getDay() : presentDay.getDay().toString()

    const [stringDate,] = useState(presentDay.getFullYear() + "-" + month + "-" + day);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [userFunction, setUserFunction] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");

    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [dateErr, setDateErr] = useState(false);
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        fetch(BASE_URL + "/csrf/", {
            method: "GET",
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                setCsrfToken(data.csrfToken)
            });

    }, []);
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (
            firstName !== "" &&
            lastName !== "" &&
            email !== "" &&
            gender !== "" &&
            birthday !== "" &&
            userFunction !== "" &&
            subject !== "" &&
            content !== "" &&
            stringDate !== ""
        ){
            setShowErrorMessage( false);
            const postData = {
                "firstName":firstName,
                "lastName":lastName,
                "email":email,
                "gender":gender,
                "birthdate":birthday,
                "function":userFunction,
                "subject":subject,
                "content":content
            }
            fetch(BASE_URL + "/contact/", {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify(postData)
            })
                .then(response => {
                    if (response.ok){
                        console.log('Form submitted successfully');
                    }else{
                        console.log('Error submitting form');
                    }
                }).catch(error => console.error('Error:', error));

        }else{
            setShowErrorMessage(true);
        }
    }

    const formatErrorHandler = () =>{
        console.log("error")
        const dateRe = /\d\d\/\d\d\/\d\d\d\d/i;
        if (dateRe.test(birthday)){
            setDateErr(!dateRe.test(birthday));
            setBirthday("");
        }
    }
    return(
        <main>
           <h1>Demande de contact</h1>
            <div className={"contact__form"}>
                <img className={"contact__img"} src={illustration} alt={"Illustration image"}/>
                <form onSubmit={handleSubmit} name={"contact-form"} method={"POST"}>
                    <div className={"contact__input"}>
                        <label htmlFor="first-name">Prénom</label>
                        <input name={"first-name"} placeholder={"Entrez votre prénom"} onChange={(e) => setFirstName(e.target.value)} required/>
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="last-name">Nom</label>
                        <input name={"last-name"} placeholder={"Entrez votre nom"} onChange={(e) => setLastName(e.target.value)} required/>
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="mail">Email</label>
                        <input name={"mail"} type={"email"} placeholder={"monmail@monsite.org"} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="gender">Genre</label>
                        <div className={"contact__radio__button"}>
                            <div>
                                <label htmlFor="gender">Homme</label>
                                <input value={"male"} name={"gender"} type={"radio"} onChange={(e) => setGender(e.target.value)} required/>
                            </div>
                            <div>
                                <label htmlFor="gender">Femme</label>
                                <input value={"female"} name={"gender"} type={"radio"} onChange={(e) => setGender(e.target.value)} required/>
                            </div>
                        </div>
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="birthday">Date de naissance</label>
                        <input name={"birthday"} type={"date"} placeholder={"jj/mm/aaaa"} onChange={(e) => setBirthday(e.target.value)} required/>
                        {dateErr && <p className={"text__error"}>La date doit être de la forme DD/MM/YYYY</p>}
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="function">Fonction</label>
                        <select name={"function"} onChange={(e) => setUserFunction(e.target.value)} required>
                            <option value={""}>-- Sélectionner une option --</option>
                            <option value={"teacher"}>Enseignant</option>
                            <option value={"student"}>Etudiant</option>
                            <option value={"other"}>Autre</option>
                        </select>
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="subject">Sujet</label>
                        <input name={"subject"} placeholder={"Entrez le sujet de votre mail"} onChange={(e) => setSubject(e.target.value)} required/>
                    </div>
                    <div className={"contact__input"}>
                        <label htmlFor="content">Contenu</label>
                        <textarea name={"content"}  placeholder={"Tapez ici votre mail"} onChange={(e) => setContent(e.target.value)} required/>
                    </div>
                    <input name={"contact-date"} type={"date"} value={stringDate} hidden readOnly required/>
                    {showErrorMessage ??
                    <p className="text__error">Les champs remplis ne sont pas valides !</p>}
                    <input onClick={formatErrorHandler} className={"contact__submit__btn"} name={"submit"} type={"submit"} value={"Envoyer"}/>
                </form>
            </div>
        </main>
    )
}

export default Contact;
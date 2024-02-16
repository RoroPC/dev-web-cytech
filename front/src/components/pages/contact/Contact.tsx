import "./Contact.scss"
import illustration from '../../../assets/images/contact_img.svg';
function Contact(){
    return(
        <main>
           <h1>Contact</h1>
            <div className={"contact__form"}>
                <img src={illustration} alt={"Illustration image"}/>
            </div>
        </main>
    )
}

export default Contact;
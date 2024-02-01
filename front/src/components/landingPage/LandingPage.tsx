import "./LandingPage.scss"
import fleur1 from "../../assets/images/fleur.png";
import fleur2 from "../../assets/images/fleur2.png";

function LandingPage(){
    return(
        <main>
            <div className="title">
                <div className="flower-images">
                    <img src={fleur1} alt="Image de fleur" id="fleur-1"/>
                    <img src={fleur2} alt="image de fleur" id="fleur-2"/>
                </div>
                <div>
                    <h1>Fleurtissimo</h1>
                    <p>Le meilleur magasin de fleurs de France</p>
                </div>
                <a className="call-button">Découvrez nos produits</a>
            </div>
            <div className="article-list">
                <article>
                    <h2>Bienvenue chez Fleurtissimo</h2>
                    <p>Faites fleurir chaque moment avec notre collection exquise de fleurs
                        Bienvenue sur Fleurtissimo, votre destination florale en ligne.
                        Nous sommes ravis de vous offrir une expérience unique pour exprimer vos émotions à travers des
                        fleurs magnifiques.
                        Explorez notre sélection soigneusement composée et laissez la beauté naturelle égayer votre vie
                    </p>
                </article>
                <article>
                    <h2>Nos Collections</h2>
                    <h3>Fleurs pour toutes occasions</h3>
                    <p>Que ce soit pour un anniversaire, un mariage, une naissance ou simplement pour exprimer votre
                        amour,
                        nos collections de fleurs sont conçues pour capturer l'essence de chaque moment spécial.
                    </p>
                    <h3>Fleurs fraîches de qualité</h3>
                    <p>
                        Nous nous engageons à vous offrir des fleurs fraîches et de la plus haute qualité. Chaque
                        bouquet
                        est préparé avec soin par nos experts floraux pour garantir une expérience florale
                        exceptionnelle.
                    </p>
                </article>
                <article>
                    <h2>Pourquoi choisir Fleurtissimo?</h2>
                    <h3>Livraison rapide et fiable</h3>
                    <p>Recevez vos fleurs à temps, partout où vous en avez besoin.</p>
                    <h3>Service client dédié</h3>
                    <p>
                        Notre équipe est là pour rendre votre expérience de magasinage agréable
                    </p>
                    <h3>Personnalisation</h3>
                    <p>
                        Ajoutez une touche personnelle avec des options de personnalisation pour chaque bouquet.
                    </p>
                </article>
            </div>
        </main>
    )
}

export default LandingPage;
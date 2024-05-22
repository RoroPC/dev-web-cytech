# Projet Web
## Lancer le projet
### Avec Docker (recommandé)
Pour lancer le projet entier (Front/back) avec docker il faut exécuter cette commande :  
```docker-compose up --build```  
### Sans Docker
Pour lancer le projet sans docker il faudra suivre les parties suivante individuellement.  

#### Front  
Le front utilise React : 
Pour lancer le serveur React : 
```
cd front
npm install 
npm run dev
```


#### Back
Le back utilise Django (Rest) :
Pour installer les dependances (avec un environement virtuel) (commande pour un environnement UNIX):
```
cd back
python3 -m venv .venv     
source .venv/bin/activate
pip install -r requirements.txt
```

Une fois que les dépendances sont installées :

Actualiser la base de donnés:
```
python3 manage.py migrate
```

Pour lancer le server Rest en HTTPS:

```
python3 manage.py runserver_plus --cert-file cert.pem --key-file key.pem
```



## Accéder au site web
Accés à l'UI sans docker : 
http://localhost:5173/

Accés à l'UI avec docker :
http://localhost:3000/

### Se connecter en administrateur
Utiliser ce lien : http://localhost:3000/ (Docker), http://localhost:5173/ (sans docker)

Adresse email : **jf@gmail.com**  
Mot de passe : **testtest**

### Débuggage 
Si la connexion/inscription ne fonctionne pas, et que dans la console du navigateur vous avez une erreur du type : NET::ERR_CERT_AUTHORITY_INVALID  
Pour chrome :  
- Aller ici **chrome://flags/#allow-insecure-localhost**
- Metter ce paramètre **Allow invalid certificates for resources loaded from localhost** a **enabled**


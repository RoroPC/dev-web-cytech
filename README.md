# Projet Web
## Lancer le projet
### Avec Docker
Pour lancer le projet entier (Front/back) avec docker il faut exécuter cette commande :  
```docker-compose up```  
### Sans Docker
Pour lancer le projet sans docker il faudra suivre les parties suivante individuellement.  

## Front  
### Sans docker
Le front utilise React : 
Pour lancer le serveur React : 
```
cd front
npm install 
npm run dev
```
### Avec docker
Sur un environnement Unix avec docker installer, le script ```launch.sh``` lance le front.  

## Back
### Sans docker
Le back utilise Django (Rest) :
Pour installer les dependances (avec un environement virtuel):
```
cd back
python -m venv .venv     
source .venv/bin/activate
pip install -r requirements.txt
```

Une fois que les dépendances sont installées :

Actualiser la base de donnés:
```
python manage.py migrate
```

Pour lancer le server Rest :
```
python manage.py runserver
```

ou en HTTPS (recommandé): 
```
python manage.py runserver_plus --cert-file cert.pem --key-file key.pem
```

### Avec docker
Sur un environnement Unix avec docker installer, le script ```launch.sh``` lance le back.

### Accéder au l'interface administrateur 
Utiliser ce lien : https://127.0.0.1:8000/admin/ (ou URL différente si docker)  
Login : **test**  
Mot de passe : **test**

### Accéder au site web
Accés à l'UI : 
http://localhost:5173/

### Débuggage 
Si la connexion/inscription ne fonctionne pas, et que dans la console du navigateur vous avez une erreur du type : NET::ERR_CERT_AUTHORITY_INVALID  
Pour chrome :  
- Aller ici **chrome://flags/#allow-insecure-localhost**
- Metter ce paramètre **Allow invalid certificates for resources loaded from localhost** a **enabled**

#### Structure UML

![UML](./git_docs/uml.png)
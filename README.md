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
Pour installer les dependances :
```
cd back
python -m venv ./     
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

### Avec docker
Sur un environnement Unix avec docker installer, le script ```launch.sh``` lance le back.


#### Structure UML

![UML](./git_docs/uml.png)
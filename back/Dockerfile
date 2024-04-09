# Utiliser une image Python officielle en tant que base
FROM python:3.10-slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier requirements.txt contenant les dépendances de l'application
COPY requirements.txt .

# Installer les dépendances de l'application
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste du code de l'application dans le conteneur
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 8000


# Exécuter la commande pour démarrer l'application Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

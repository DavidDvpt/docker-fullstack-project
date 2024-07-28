#!/bin/bash

# Fonction pour vérifier si un répertoire est vide ou n'existe pas
is_empty_or_nonexistent() {
  [ ! -d "$1" ] || [ -z "$(ls -A "$1")" ]
}

# Fonction pour vérifier si une image Docker existe
image_exists() {
  docker images -q "$1" > /dev/null 2>&1
}

# Noms des images à vérifier
CLIENT_IMAGE="fullstack-eu-manager-client"
SERVER_IMAGE="fullstack-eu-manager-server"
MYSQL_IMAGE="mysql"

# Arrêter et supprimer les conteneurs existants
echo "********* ARRET ET SUPPRESSION DES CONTAINERS DETACHES *********"
docker-compose down

# Vérifier si les images existent
if ! (image_exists "$CLIENT_IMAGE" && image_exists "$SERVER_IMAGE" && image_exists "$MYSQL_IMAGE"); then
  echo "********* DEBUT DE CREATION DES IMAGES *********"
  docker-compose build --no-cache 2>&1 | tee build.log
  echo "********* FIN DE CREATION DES IMAGES *********"
else
  echo "********* LES IMAGES EXISTENT. LANCEMENT DU SCRIPT ********* "

  # Vérifier si les répertoires node_modules sont vides ou n'existent pas
  if is_empty_or_nonexistent "./client/node_modules" || is_empty_or_nonexistent "./server/node_modules"; then
    echo "********* LES NODE MODULES N'EXISTENT PAS *********"
    echo "********* CREATION DES CONTAINERS DETACHES *********"
    docker-compose up -d

    # Copier les node_modules du conteneur vers l'hôte
    if is_empty_or_nonexistent "./client/node_modules"; then
      echo "********* COPIE DES NODE MODULES DU CLIENT *********"
      docker cp $(docker-compose ps -q client):/app/client/node_modules ./client
    fi

    if is_empty_or_nonexistent "./server/node_modules"; then
      echo "********* COPIE DES NODE MODULES DU SERVEUR *********"
      docker cp $(docker-compose ps -q server):/app/server/node_modules ./server
    fi

    echo "********* FIN DE COPIE DES FICHIERS *********"

    echo "********* ARRET ET SUPPRESSION DES CONTAINERS DETACHES *********"
    docker-compose down
  fi
fi

# Démarrer les conteneurs
echo "********* CREATION DES CONTAINERS FINAUX *********"
docker-compose up
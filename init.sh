#!/bin/bash

# Arrêter et supprimer les conteneurs existants
docker-compose down

docker-compose build --no-cache 2>&1 | tee build.log
# Construire les images et démarrer les conteneurs
docker-compose up -d

# Copier les node_modules du conteneur vers l'hôte
docker cp $(docker-compose ps -q client):/app/client/node_modules ./client
docker cp $(docker-compose ps -q server):/app/server/node_modules ./server

# Redémarrer les conteneurs avec les volumes montés
docker-compose down
docker-compose up

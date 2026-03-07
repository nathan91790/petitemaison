# Image officielle Node
FROM node:20

# Dossier de travail dans le container
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Exposer le port de l'application
EXPOSE 3000

# Commande de démarrage
CMD sh -c "sleep 10 && npx prisma migrate deploy && node src/server.js"
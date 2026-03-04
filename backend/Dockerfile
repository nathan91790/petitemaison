# Image officielle Node
FROM node:20-alpine

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
CMD ["node", "src/server.js"]
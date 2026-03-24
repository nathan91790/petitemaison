Commandes utiles
Lancer toute l’application avec Docker
docker compose up --build
Arrêter l’application
docker compose down
Voir les logs du backend
docker logs petitemaison_backend
Voir tous les logs Docker
docker compose logs
Lancer le backend en local
cd backend
npm install
npm start
Lancer le frontend
cd frontend
npm install
npm run dev
Ouvrir Prisma Studio
cd backend
npx prisma studio
Appliquer les migrations Prisma
cd backend
npx prisma migrate deploy
Lancer les tests backend
cd backend
npm test
Lancer les tests frontend
cd frontend
npm test
Scanner les vulnérabilités Node.js
npm audit
Si >1 vulnérabilité
npm audit fix
npmaudit
Scanner les images Docker
trivy image petitemaison-backend

Lancer le front
npm run dev

//Commande pour centraliser la connexion à la base de données
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;
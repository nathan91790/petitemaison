const express = require("express");
const prisma = require("../services/prisma");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const router = express.Router();

// Création produit (Admin UNIQUEMENT)
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { name, description, price, stock, imageUrl } = req.body;

        //gestion des erreurs
        if (!name || !description || price == null || stock == null || !imageUrl) {
            return res.status(400).json({ message: "Champs requis manquants" });
        }

        //création du produit
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: Number(price),
                stock: Number(stock),
                imageUrl,
            },
        });

        //renvoie le produit créé
        res.status(201).json(product);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur serveur" });
    }
});

//liste produits (publique)
router.get("/", async (req, res) => {
    try {

        const products = await prisma.product.findMany();

        console.log("Products:", products);

        res.json(products);

    } catch (error) {

        console.error("ERREUR PRODUCTS :", error);

        res.status(500).json({ error: error.message });

    }
});

module.exports = router;


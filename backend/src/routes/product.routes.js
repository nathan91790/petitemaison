const express = require("express");
const prisma = require("../services/prisma");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { name, description, price, stock, imageUrl } = req.body;

        if (!name || !description || price == null || stock == null) {
            return res.status(400).json({ message: "Champs requis manquants" });
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: Number(price),
                stock: Number(stock),
                imageUrl: imageUrl || "/uploads/default-product.png"
            },
        });

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


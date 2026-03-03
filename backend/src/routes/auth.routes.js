const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("../services/prisma");
const jwt = require("jsonwebtoken");


const router = express.Router();

// Route d'inscription
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        //gestion des erreurs
        if (!email || !password) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }

        //hashage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        //création de l'utilisateur
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        //renvoie l'id de l'utilisateur créé
        res.status(201).json({
            message: "Utilisateur créé avec succès",
            userId: user.id,
        });

        //gestion des erreurs
    } catch (error) {
        console.error(error);

        //gestion de l'erreur email déjà existant
        if (error.code === "P2002") {
            return res.status(409).json({ error: "Email déjà existant" });
        }

        //gestion des autres erreurs
        return res.status(500).json({ error: "Erreur serveur" });
    }
})

// Route de connexion
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        //gestion des erreurs
        if (!email || !password) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        //gestion des erreurs utilisateur non trouvé
        if (!user) {
            return res.status(401).json({ message: "Identifiant invalides" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        //gestion des erreurs mot de passe invalide
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Identifiant invalides" });
        }

        //génération du token
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        //renvoie le token
        res.json({
            message: "Connexion reussie",
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur serveur" });
    }
});

module.exports = router;
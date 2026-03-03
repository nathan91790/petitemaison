const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middleware/auth.middleware");
const productRoutes = require("./routes/product.routes");

// Initialisation de l'application
const app = express();

// Middleware Globaux
app.use(helmet());

// cela sert a dire au serveur d'accepter les requete du frontend uniquement pas des autres
app.use(
    cors({
        origin: "http://localhost:5173", // futur Frontend
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

// Middleware pour parser le JSON
app.use(express.json());
// Routes
app.use("/api/auth", authRoutes);

// Route protégée
app.get("/api/protected", authMiddleware, (req, res) => { 
    res.json({
        message: "Route protégée accessible",
        user: req.user, 
    }); 
});

// Route test
app.get("/", (req, res) => {
    res.json({ message: "API Petite Maison de l'Épouvante V1" });
});

// Routes produits
app.use("/api/products", productRoutes);

module.exports = app;


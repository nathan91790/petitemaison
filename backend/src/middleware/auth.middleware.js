const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Vérification de l'authentification avec le token
    if (!authHeader) {
        return res.status(401).json({ message: "Token manquant" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("TOKEN DECODED", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token invalide" });
    }
};

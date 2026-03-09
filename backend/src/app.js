const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middleware/auth.middleware");
const productRoutes = require("./routes/product.routes");
const uploadRoutes = require("./routes/upload.routes");

const app = express();

/* =========================
   PATH UPLOADS
========================= */

const uploadsPath = path.resolve("uploads");

console.log("WORKDIR:", process.cwd());
console.log("UPLOADS PATH:", uploadsPath);

/* =========================
   CORS
========================= */

app.use(cors({
   origin: "*",
   methods: ["GET", "POST", "PUT", "DELETE"],
}));

/* =========================
   PARSER JSON
========================= */

app.use(express.json());

/* =========================
   SERVIR LES IMAGES
========================= */

app.use("/uploads", express.static(uploadsPath));

/* =========================
   ROUTES API
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/products", productRoutes);

/* =========================
   ROUTE PROTECTED (tests)
========================= */

app.get("/api/protected", authMiddleware, (req, res) => {

   res.json({
      message: "Protected route accessed",
      user: req.user
   });

});

/* =========================
   ROUTE TEST
========================= */

app.get("/", (req, res) => {
   res.json({ message: "API Petite Maison de l'Épouvante" });
});
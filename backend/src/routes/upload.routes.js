const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve("uploads"));
    },
    filename: (req, file, cb) => {
        const cleanName = file.originalname.replace(/\s+/g, "_");
        cb(null, Date.now() + "-" + cleanName);
    }
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {

    const imageUrl = `/uploads/${req.file.filename}`;

    res.json({ imageUrl });

});

module.exports = router;
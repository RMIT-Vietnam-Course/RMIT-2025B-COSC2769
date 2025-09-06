const express = require("express");
const { body, validationResult } = require("express-validator");
const { MongoClient } = require("mongodb");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;
const USERNAME = "tester"; // Hardcoded user for demo.
const UPLOAD_DIR = path.join(__dirname, "uploads");

// If uploads/ not exists, create a new one.
if (!fs.existsSync(UPLOAD_DIR))
    fs.mkdirSync(UPLOAD_DIR);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(UPLOAD_DIR));

// Upload config.
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_DIR),
    // Change filename to avoid duplicate.
    filename: (req, file, cb) => {
        const safe = file.originalname.replace(/[^a-z0-9_]/gi, "_");
        const ext = path.extname(safe);
        const base = path.basename(safe, ext);

        cb(null, `${Date.now()}_${base}${ext}`);
    }
});

function imageFilter(req, file, cb) {
    if (/^image\//.test(file.mimetype)) cb(null, true);
    else cb(new Error("Only image is allowed."));
}

const upload = multer({
    storage,
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB.
});

// Mongo.
const url = "mongodb+srv://tester:Rmit123@cluster0.pu8hofz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url);
const DB_NAME = "library";
async function usersCollection() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
        console.log("Mongo connected.");
    }

    return client.db(DB_NAME).collection("users");
}

// GET avatar.
app.get("/avatar", async (req, res) => {
    try {
        const c = await usersCollection();
        const user = await c.findOne({ username: USERNAME }, { projection: { _id: 0, avatar: 1 } });

        res.json(user || { username: USERNAME, avatar: "" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// SET avatar.
app.post("/avatar", upload.single("avatar"), body("dummy").optional(), async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        if (req.file)
            fs.unlink(path.join(UPLOAD_DIR, req.file.filename), () => { });

        return res.status(400).json(result.array());
    }

    if (!req.file)
        return res.status(400).json([{ msg: "No image file provided.", param: "avatar" }]);

    const c = await usersCollection();
    const newPath = `/uploads/${req.file.filename}`;

    try {
        const existing = await c.findOne({ username: USERNAME }, { projection: { avatar: 1 } });

        await c.updateOne(
            { username: USERNAME },
            { $set: { username: USERNAME, avatar: newPath } },
            { upsert: true }
        );

        if (existing && existing.avatar) {
            const abs = path.join(__dirname, existing.avatar.replace("/uploads/", "uploads/"));
            fs.access(abs, fs.constants.F_OK, (err) => {
                if (!err)
                    fs.unlink(abs, () => { });
            });
        }

        res.status(201).json({ username: USERNAME, avatar: newPath });
    } catch (e) {
        fs.unlink(path.join(UPLOAD_DIR, req.file.filename), () => { });
        res.status(500).json({ error: e.message });
    }
});

app.listen(PORT, () => console.log(`Server on ${PORT}...`));
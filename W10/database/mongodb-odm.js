const express = require("express");
const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://tester:Rmit123@cluster0.pu8hofz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
const PORT = 3000;

app.use(express.json());

async function main() {
    await mongoose.connect(MONGO_URI);
    console.log("ODM Mongoose connected.");

    const bookSchema = new mongoose.Schema({
        title: String,
        author: String,
        price: Number,
        published_year: Number
    }, { versionKey: false });

    const Book = mongoose.model("Book", bookSchema, "books");

    // Create a book.
    app.post("/books", async (req, res) => {
        try {
            const { title, author, price, published_year } = req.body || {};

            if (!title || !author || price == null) return res.status(400).json({ error: "Title, Author, Price are required." });

            const b = await Book.create({ title, author, price, published_year });
            res.status(201).json(b);
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    // Read all books.
    app.get("/books", async (req, res) => {
        try { res.json(await Book.find({}, null).lean()); }
        catch (e) { res.status(500).json({ error: e.message }); }
    });

    // Read one book.
    app.get("/books/:id", async (req, res) => {
        try {
            const b = await Book.findById(req.params.id).lean();
            return b ? res.json(b) : res.sendStatus(404);
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    // Update a book.
    app.put("/books/:id", async (req, res) => {
        try {
            const b = await Book.findByIdAndUpdate(req.params.id, req.body || {}, { new: true }).lean();
            return b ? res.json(b) : res.sendStatus(404);
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    // Delete a book.
    app.delete("/books/:id", async (req, res) => {
        try {
            const r = await Book.deleteOne({ _id: req.params.id });
            return r.deletedCount ? res.sendStatus(204) : res.sendStatus(404);
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    app.listen(PORT, () => console.log(`mongodb-odm on ${PORT}...`));
}

main();
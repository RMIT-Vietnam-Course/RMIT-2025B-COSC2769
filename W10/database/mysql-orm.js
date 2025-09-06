const express = require("express");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("test_db", "root", "password", {
    host: "localhost",
    dialect: "mysql",
    logging: false
});

const Book = sequelize.define("Book", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    title: Sequelize.STRING,
    author: Sequelize.STRING,
    price: Sequelize.DECIMAL(10, 2),
    published_year: Sequelize.INTEGER
}, { tableName: "Books", timestamps: false });

const app = express();
const PORT = 3000;

app.use(express.json());

// Create a book.
app.post("/books", async (req, res) => {
    try {
        const { title, author, price, published_year } = req.body || {};

        if (!title || !author || price == null)
            return res.status(400).json({ error: "Title, Author, Price are required." });

        const b = await Book.create({ title, author, price, published_year });
        res.status(201).json(b);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// Read all books.
app.get("/books", async (req, res) => {
    try { res.json(await Book.findAll()); }
    catch (e) { res.status(500).json({ error: e.message }); }
});

// Read one book.
app.get("/books/:id", async (req, res) => {
    try {
        const b = await Book.findByPk(req.params.id);
        return b ? res.json(b) : res.sendStatus(404);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// Update a book.
app.put("/books/:id", async (req, res) => {
    try {
        const b = await Book.findByPk(req.params.id);

        if (!b) return res.sendStatus(404);

        await b.update(req.body || {});
        res.json(b);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// Delete a book.
app.delete("/books/:id", async (req, res) => {
    try {
        const n = await Book.destroy({ where: { id: req.params.id } });
        return n ? res.sendStatus(204) : res.sendStatus(404);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

sequelize.authenticate().then(() => {
    app.listen(PORT, () => console.log(`mysql-orm on ${PORT}...`));
});
const express = require("express");
const mysql = require("mysql");

const app = express();
const PORT = 3000;

app.use(express.json());

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "test_db"
});

conn.connect((err) => {
    if (err) throw err;
    console.log("Plain MySQL connected.");
});

// Create a book.
app.post("/books", (req, res) => {
    const { title, author, price, published_year } = req.body || {};

    if (!title || !author || price == null)
        return res.status(400).json({ error: "Title, Author, Price are required." });

    conn.query(
        "INSERT INTO Books (title, author, price, published_year) VALUES (?, ?, ?, ?)",
        [title, author, price, published_year || null],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            res.status(201).json({ id: result.insertId, title, author, price, published_year: published_year || null });
        }
    );
});

// Read all books.
app.get("/books", (req, res) => {
    conn.query("SELECT * FROM Books ORDER BY title", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json(rows);
    });
});

// Read one book.
app.get("/books/:id", (req, res) => {
    conn.query("SELECT * FROM Books WHERE id = ?", [req.params.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!rows.length) return res.sendStatus(404);

        res.json(rows[0]);
    });
});

// Update a book.
app.put("/books/:id", (req, res) => {
    const { title, author, price, published_year } = req.body || {};

    // Build SET dynamically.
    const fields = [];
    const vals = [];

    if (title !== undefined) { fields.push("title = ?"); vals.push(title); }
    if (author !== undefined) { fields.push("author = ?"); vals.push(author); }
    if (price !== undefined) { fields.push("price = ?"); vals.push(price); }
    if (published_year !== undefined) { fields.push("published_year = ?"); vals.push(published_year); }

    if (!fields.length) return res.status(400).json({ error: "No fields to update." });

    vals.push(req.params.id);

    conn.query(`UPDATE Books SET ${fields.join(", ")} WHERE id = ?`, vals, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!result.affectedRows) return res.sendStatus(404);

        conn.query("SELECT * FROM Books WHERE id = ?", [req.params.id], (err2, rows) => {
            if (err2) return res.status(500).json({ error: err2.message });

            res.json(rows[0]);
        });
    });
});

// Delete a book.
app.delete("/books/:id", (req, res) => {
    conn.query("DELETE FROM Books WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        return result.affectedRows ? res.sendStatus(204) : res.sendStatus(404);
    });
});

app.listen(PORT, () => console.log(`mysql-plain on ${PORT}...`));
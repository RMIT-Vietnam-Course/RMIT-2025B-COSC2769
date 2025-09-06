const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb+srv://tester:Rmit123@cluster0.pu8hofz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url);

const app = express();
const PORT = 3000;

app.use(express.json());

async function col() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
        console.log("Plain Mongo connected.");
    }

    return client.db("library").collection("books");
}

// Create a book.
app.post("/books", async (req, res) => {
    try {
        const { title, author, price, published_year } = req.body || {};

        if (!title || !author || price == null) return res.status(400).json({ error: "Title, Author, Price are required." });

        const r = await (await col()).insertOne({ title, author, price, published_year });
        res.status(201).json({ _id: r.insertedId, title, author, price, published_year });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// Read all books.
app.get("/books", async (req, res) => {
    try { res.json(await (await col()).find({}).toArray()); }
    catch (e) { res.status(500).json({ error: e.message }); }
});

// Read one book.
app.get("/books/:id", async (req, res) => {
    try {
        const b = await (await col()).findOne({ _id: new ObjectId(req.params.id) });
        return b ? res.json(b) : res.sendStatus(404);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// Update a book.
app.put("/books/:id", async (req, res) => {
    try {
        const r = await (await col()).findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body || {} },
            { returnDocument: "after" }
        );

        return r ? res.json(r) : res.sendStatus(404);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// Delete a book.
app.delete("/books/:id", async (req, res) => {
    try {
        const r = await (await col()).deleteOne({ _id: new ObjectId(req.params.id) });
        return r.deletedCount ? res.sendStatus(204) : res.sendStatus(404);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(PORT, () => console.log(`mongodb-plain on ${PORT}...`));
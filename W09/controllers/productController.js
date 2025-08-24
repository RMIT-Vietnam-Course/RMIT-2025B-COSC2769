const { products } = require('../data/data');
const { v4: uuidv4 } = require('uuid');

// Read all products (id and name).
exports.list = async (req, res, next) => {
    const data = products.map(p => ({ id: p.id, name: p.name }));
    res.json(data);
};

// Read a product detail.
exports.get = async (req, res, next) => {
    const productId = req.params.productId;
    const data = products.find(p => p.id == productId);
    res.json(data);
};

// Create a new product.
exports.create = async (req, res, next) => {
    const id = uuidv4(); // Generate a new id.
    const name = req.body.name;
    const price = req.body.price;

    products.push({ id, name, price });
    res.json({ id });
};
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const { customers, orders, products } = require('./data');

app.use(cors());
app.use(express.json());

app.get('/customers', (req, res) => {
    res.json(customers);
});

app.get('/customers/:id', (req, res) => {
    const id = Number(req.params.id);
    const customer = customers.find(c => c.id === id);
    const customerOrders = orders
        .filter(o => o.customer_id === id)
        .map(o => ({ product_id: o.product_id, quantity: o.quantity }));

    res.json({ ...customer, orders: customerOrders });
});

app.get('/customers/:id/total', (req, res) => {
    const customerId = Number(req.params.id);
    const total = orders
        .filter(o => o.customer_id === customerId)
        .reduce((sum, o) => {
            const product = products.find(p => p.id === o.product_id);
            const percent = product.sell_off ? product.percent : 0;
            const actualPrice = product.price * (1 - percent / 100);

            return sum + actualPrice * o.quantity;
        }, 0);

    res.json({ total_price: total });
});

app.use((req, res) => {
    res.status(404).json({ msg: 'not found' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
const express = require('express');
const cookieParser = require('cookie-parser');
const { userRoutes } = require('./routes/userRoutes');
const { productRoutes } = require('./routes/productRoutes');
const userController = require('./controllers/userController');

const app = express();
const port = 3000;
const SECRET = 'RMIT-COSC2769';

app.use(cookieParser(SECRET));

app.get('/', (req, res) => res.json({ msg: 'Homepage.' }));

app.use('/products', productRoutes);
app.use('/users', userController.authorize, userRoutes);

app.all(/.*/, (req, res) => res.status(404).json({ msg: 'Not Found!' }));

app.listen(port, () => console.log(`Server running on port ${port}...`));
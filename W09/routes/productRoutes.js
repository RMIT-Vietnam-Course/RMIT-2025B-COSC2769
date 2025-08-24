const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.list);
router.get('/:productId', productController.get);
router.post('/', express.json(), productController.create);

exports.productRoutes = router;
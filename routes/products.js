const express = require('express');
const productsRepo = require('../repositories/products');
const productsIndexTemplate = require('../viewwws/products/index');

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({ products }));
});

module.exports = router;
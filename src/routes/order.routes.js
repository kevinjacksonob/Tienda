const { Router } = require('express');
const { getOrdersByUserId } = require('../controllers/order.controller');

const router = Router();

router.get('/orders/:id', getOrdersByUserId );

module.exports = router;
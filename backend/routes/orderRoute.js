const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware');
const { createOrderByCod, createOrderByPaypal, getOrderByOrderId, getOrderByUserId, getAllOrders } = require('../controllers/orderCtrl');
const router = express.Router();

router.get('/', getAllOrders);
router.post('/', authenticate, createOrderByCod);
router.post('/paypal', authenticate, createOrderByPaypal);
router.get('/user-orders', authenticate, getOrderByUserId);
router.get('/:id', getOrderByOrderId);

module.exports = router;
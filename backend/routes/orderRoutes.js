const express = require('express');
const {
   createOrder,
   getOrders,
   getOrderById,
   updateOrderStatus,
   deleteOrder
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
   .get(protect, getOrders)
   .post(protect, createOrder);

router.route('/:id')
   .get(protect, getOrderById)
   .put(protect, updateOrderStatus)
   .delete(protect, deleteOrder);

module.exports = router;

const express = require('express');
const {
   getTotalStockValue,
   getMostSoldProducts,
   getLeastSoldProducts,
   getInventoryMovement,
   getSupplierPerformance,
} = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/total-stock-value', protect, getTotalStockValue);
router.get('/most-sold-products', protect, getMostSoldProducts);
router.get('/least-sold-products', protect, getLeastSoldProducts);
router.get('/inventory-movement', protect, getInventoryMovement);
router.get('/supplier-performance', protect, getSupplierPerformance);

module.exports = router;

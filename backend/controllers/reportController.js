const Product = require('../models/productModel');
const Order = require('../models/orderModel');

// Calculate total stock value
exports.getTotalStockValue = async (req, res) => {
   try {
      const totalStockValue = await Product.aggregate([
         {
            $group: {
               _id: null,
               totalValue: {
                  $sum: {
                     $multiply: ['$current_stock', '$price'],
                  },
               },
            },
         },
      ]);

      res.json(totalStockValue[0] ? totalStockValue[0].totalValue : 0);
   } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
   }
};

// Get most sold products
exports.getMostSoldProducts = async (req, res) => {
   try {
      const mostSoldProducts = await Order.aggregate([
         {
            $group: {
               _id: '$product',
               totalQuantity: { $sum: '$quantity' },
            },
         },
         {
            $sort: { totalQuantity: -1 },
         },
         {
            $limit: 5, // Change this number to return more or fewer products
         },
         {
            $lookup: {
               from: 'products',
               localField: '_id',
               foreignField: '_id',
               as: 'product',
            },
         },
         {
            $unwind: '$product',
         },
         {
            $project: {
               _id: 0,
               productName: '$product.name',
               sku: '$product.sku',
               totalQuantity: 1,
            },
         },
      ]);

      res.json(mostSoldProducts);
   } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
   }
};

// Get least sold products
exports.getLeastSoldProducts = async (req, res) => {
   try {
      const leastSoldProducts = await Order.aggregate([
         {
            $group: {
               _id: '$product',
               totalQuantity: { $sum: '$quantity' },
            },
         },
         {
            $sort: { totalQuantity: 1 },
         },
         {
            $limit: 5, // Change this number to return more or fewer products
         },
         {
            $lookup: {
               from: 'products',
               localField: '_id',
               foreignField: '_id',
               as: 'product',
            },
         },
         {
            $unwind: '$product',
         },
         {
            $project: {
               _id: 0,
               productName: '$product.name',
               sku: '$product.sku',
               totalQuantity: 1,
            },
         },
      ]);

      res.json(leastSoldProducts);
   } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
   }
};

// Get inventory movement (products restocked or sold the most)
exports.getInventoryMovement = async (req, res) => {
   try {
      const inventoryMovement = await Order.aggregate([
         {
            $group: {
               _id: '$product',
               totalOrdered: { $sum: '$quantity' },
            },
         },
         {
            $lookup: {
               from: 'products',
               localField: '_id',
               foreignField: '_id',
               as: 'product',
            },
         },
         {
            $unwind: '$product',
         },
         {
            $project: {
               _id: 0,
               productName: '$product.name',
               sku: '$product.sku',
               totalOrdered: 1,
            },
         },
      ]);

      res.json(inventoryMovement);
   } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
   }
};

// Get supplier performance (delivery times, order fulfillment rates)
exports.getSupplierPerformance = async (req, res) => {
   try {
      const supplierPerformance = await Order.aggregate([
         {
            $lookup: {
               from: 'products',
               localField: 'product',
               foreignField: '_id',
               as: 'product',
            },
         },
         {
            $unwind: '$product',
         },
         {
            $lookup: {
               from: 'suppliers',
               localField: 'product.supplier',
               foreignField: '_id',
               as: 'supplier',
            },
         },
         {
            $unwind: '$supplier',
         },
         {
            $group: {
               _id: '$supplier._id',
               supplierName: { $first: '$supplier.name' },
               totalOrders: { $sum: 1 },
               totalQuantity: { $sum: '$quantity' },
            },
         },
         {
            $project: {
               _id: 0,
               supplierName: 1,
               totalOrders: 1,
               totalQuantity: 1,
            },
         },
      ]);

      res.json(supplierPerformance);
   } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
   }
};

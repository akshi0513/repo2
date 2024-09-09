const Order = require('../models/orderModel');
const Product = require('../models/productModel');

exports.createOrder = async (req, res) => {
   const { product_id, quantity } = req.body;

   const product = await Product.findById(product_id);

   if (!product) {
      return res.status(404).json({ message: 'Product not found' });
   }

   const order = new Order({
      product: product_id,
      quantity,
   });

   const createdOrder = await order.save();

   // Update stock levels
   product.current_stock += quantity;
   await product.save();

   res.status(201).json(createdOrder);
};

exports.getOrders = async (req, res) => {
   const orders = await Order.find({})
      .populate('product', 'name sku')
      .sort({ order_date: -1 });

   res.json(orders);
};

exports.getOrderById = async (req, res) => {
   const order = await Order.findById(req.params.id)
      .populate('product', 'name sku');

   if (order) {
      res.json(order);
   } else {
      res.status(404).json({ message: 'Order not found' });
   }
};

exports.updateOrderStatus = async (req, res) => {
   const { status } = req.body;
   const order = await Order.findById(req.params.id);

   if (order) {
      order.status = status;

      if (status === 'Completed') {
         const product = await Product.findById(order.product);
         if (product) {
            product.current_stock += order.quantity;
            await product.save();
         }
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
   } else {
      res.status(404).json({ message: 'Order not found' });
   }
};

exports.deleteOrder = async (req, res) => {
   try {
     const order = await Order.findById(req.params.id);
 
     if (order) {
       await order.deleteOne(); 
       res.json({ message: 'Order removed' });
     } else {
       res.status(404).json({ message: 'Order not found' });
     }
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 };
 
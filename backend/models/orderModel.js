const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
   product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
   },
   quantity: { type: Number, required: true },
   order_date: { type: Date, default: Date.now },
   status: {
      type: String,
      enum: ['Pending', 'Completed', 'Cancelled'],
      default: 'Pending',
   },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

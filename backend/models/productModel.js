const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   name: {
       type: String, 
       required: true 
      },
   sku: { 
      type: String, 
      required: true, 
      unique: true 
   },
   description: { 
      type: String
    },
   price: { 
      type: Number, 
      required: true 
   },
   current_stock: { 
      type: Number, 
      required: true 
   },
   reorder_level: { 
      type: Number, 
      required: true
    },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

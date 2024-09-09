const mongoose = require('mongoose');

const supplierSchema = mongoose.Schema({
  name: {
    type: String,
    required: true, // Corrected spelling
    unique: true
  },
  contact_info: {
    type: String,
    required: true // Corrected spelling
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product' // Reference to the Product schema
  }],
  isDeleted: {
    type: Boolean,
    default: false
  }
});

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;

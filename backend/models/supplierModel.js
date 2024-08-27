const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
   name: { type: String, required: true },
   contact_info: { type: String },
   products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;

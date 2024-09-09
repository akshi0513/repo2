const Supplier = require('../models/supplierModel');
const Product = require('../models/productModel');

exports.createSupplier = async (req, res) => {
   const { name, contact_info, products } = req.body;

   const supplier = new Supplier({
      name,
      contact_info,
      products,
   });

   const createdSupplier = await supplier.save();
   res.status(201).json(createdSupplier);
};

exports.getSuppliers = async (req, res) => {
   const suppliers = await Supplier.find({})
      .populate('products', 'name sku');

   res.json(suppliers);
};

exports.getSupplierById = async (req, res) => {
   const supplier = await Supplier.findById(req.params.id)
      .populate('products', 'name sku');

   if (supplier) {
      res.json(supplier);
   } else {
      res.status(404).json({ message: 'Supplier not found' });
   }
};

exports.updateSupplier = async (req, res) => {
   const { name, contact_info, products } = req.body;

   const supplier = await Supplier.findById(req.params.id);

   if (supplier) {
      supplier.name = name || supplier.name;
      supplier.contact_info = contact_info || supplier.contact_info;
      supplier.products = products || supplier.products;

      const updatedSupplier = await supplier.save();
      res.json(updatedSupplier);
   } else {
      res.status(404).json({ message: 'Supplier not found' });
   }
};

exports.deleteSupplier = async (req, res) => {
   const supplier = await Supplier.findById(req.params.id);

   if (supplier) {
      await supplier.deleteOne();
      res.json({ message: 'Supplier removed' });
   } else {
      res.status(404).json({ message: 'Supplier not found' });
   }
};
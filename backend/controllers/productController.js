const Product = require('../models/productModel');

exports.getProducts = async (req, res) => {
   const products = await Product.find({});
   res.json(products);
};

exports.getProductById = async (req, res) => {
   try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
exports.createProduct = async (req, res) => {
   const { name, sku, description, price, current_stock, reorder_level } = req.body;

   const productExists = await Product.findOne({ sku });
   if (productExists) {
      return res.status(400).json({ message: 'Product already exists' });
   }

   const product = new Product({
      name, sku, description, price, current_stock, reorder_level
   });

   const createdProduct = await product.save();
   res.status(201).json(createdProduct);
};

exports.updateProduct = async (req, res) => {
   const { name, sku, description, price, current_stock, reorder_level } = req.body;

   const product = await Product.findById(req.params.id);

   if (product) {
      product.name = name || product.name;
      product.sku = sku || product.sku;
      product.description = description || product.description;
      product.price = price || product.price;
      product.current_stock = current_stock || product.current_stock;
      product.reorder_level = reorder_level || product.reorder_level;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
   } else {
      res.status(404).json({ message: 'Product not found' });
   }
};

exports.deleteProduct = async (req, res) => {
   const product = await Product.findById(req.params.id);

   if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
   } else {
      res.status(404).json({ message: 'Product not found' });
   }
};

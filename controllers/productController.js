const Product = require('../models/productModel');
exports.createProduct = (req, res) => {
    const { name, description, price, categories } = req.body;

    console.log('Creating Product:', { name, description, price, categories });

    Product.create({ name, description, price }, categories) 
        .then(() => res.status(201).json({ message: 'Product created successfully' }))
        .catch(err => {
            console.error('Error creating product:', err.message);
            res.status(500).json({ error: err.message });
        });
};

exports.getAllProducts = (req, res) => {
    Product.findAll()
        .then(([products]) => res.status(200).json(products))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.getProductById = (req, res) => {
    const { id } = req.params;
    Product.findById(id)
        .then(([product]) => {
            if (product.length === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product[0]);
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    Product.update(id, { name, description, price })
        .then(() => res.status(200).json({ message: 'Product updated successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    Product.delete(id)
        .then(() => res.status(200).json({ message: 'Product deleted successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.getProductsByCategory = (req, res) => {
    const { categoryId } = req.params;
    console.log('Fetching products for category ID:', categoryId); 
    Product.findByCategory(categoryId)
        .then(([products]) => res.status(200).json(products))
        .catch(err => res.status(500).json({ error: err.message }));
};

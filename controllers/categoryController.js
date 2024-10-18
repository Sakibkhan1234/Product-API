const Category = require('../models/categoryModel');

exports.createCategory = (req, res) => {
    const { name } = req.body;
    Category.create({ name })
        .then(() => res.status(201).json({ message: 'Category created successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.getAllCategories = (req, res) => {
    Category.findAll()
        .then(([categories]) => res.status(200).json(categories))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.getCategoryById = (req, res) => {
    const { id } = req.params;
    Category.findById(id)
        .then(([category]) => {
            if (category.length === 0) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json(category[0]);
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.updateCategory = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    Category.update(id, { name })
        .then(() => res.status(200).json({ message: 'Category updated successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.deleteCategory = (req, res) => {
    const { id } = req.params;
    Category.delete(id)
        .then(() => res.status(200).json({ message: 'Category deleted successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
};

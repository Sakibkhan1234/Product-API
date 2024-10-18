const db = require('../config/db');

const Category = {
    create: (categoryData) => {
        return db.execute(
            'INSERT INTO categories (name) VALUES (?)',
            [categoryData.name]
        );
    },

    findAll: () => {
        return db.execute('SELECT * FROM categories');
    },

    findById: (id) => {
        return db.execute('SELECT * FROM categories WHERE id = ?', [id]);
    },

    update: (id, categoryData) => {
        return db.execute(
            'UPDATE categories SET name = ? WHERE id = ?',
            [categoryData.name, id]
        );
    },

    delete: (id) => {
        return db.execute('DELETE FROM categories WHERE id = ?', [id]);
    }
};

module.exports = Category;

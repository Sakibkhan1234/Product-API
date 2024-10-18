const db = require('../config/db');

const Product = {
    create: (productData, categoryIds) => {
        return db.execute(
            'INSERT INTO products (name, description, price) VALUES (?, ?, ?)',
            [productData.name, productData.description, productData.price]
        ).then(([result]) => {
            const productId = result.insertId;
            console.log('New Product ID:', productId);

            if (categoryIds && categoryIds.length > 0) {
                const promises = categoryIds.map(categoryId => {
                    return db.execute(
                        'INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)',
                        [productId, categoryId]
                    ).then(([insertResult]) => {
                        console.log(`Inserted Category ID: ${categoryId} for Product ID: ${productId}`, insertResult);
                    });
                });
                return Promise.all(promises);

            } else {
                console.log('No categories to insert.');
            }
        });
    },


    findAll: () => {
        return db.execute('SELECT * FROM products');
    },

    findById: (id) => {
        return db.execute('SELECT * FROM products WHERE id = ?', [id]);
    },

    update: (id, productData) => {
        return db.execute(
            'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?',
            [productData.name, productData.description, productData.price, id]
        );
    },

    delete: (id) => {
        return db.execute('DELETE FROM products WHERE id = ?', [id]);
    },

    findByCategory: (categoryId) => {
        return db.execute(
            `SELECT p.* FROM products p
             JOIN product_categories pc ON p.id = pc.product_id
             WHERE pc.category_id = ?`,
            [categoryId]
        );
    }
    
};

module.exports = Product;

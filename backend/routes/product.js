// productRoutes.js (routes)

const express = require('express');
const router = express.Router();
const Product = require('../model/Product');

// Get All Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().lean();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Single Product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(401).json(err);
    }
});

// Create New Product
router.post('/newProduct', async (req, res) => {
    const { ProductCategory, ProductName, Productdesc, ProductPrice,ProductType,ProductBrand, ProductImages } = req.body;
    console.log(req.body)
    try {
        const newProduct = new Product({
            ProductCategory,
            ProductName,
            Productdesc,
            ProductPrice,
            ProductType,
            ProductBrand,
            ProductImages,
        });

        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        console.error("Error in route handler:", err);
        res.status(500).json(err);
    }
});

// Update Product by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json(err);
    }
});
router.get('/search/:query', async (req, res) => {
    try {
        // Preprocess the query: remove whitespace and convert to lowercase
        const query = req.params.query.replace(/\s/g, '').toLowerCase();

        // Remove "s" from the query if it's present
        const modifiedQuery = query.endsWith('s') ? query.slice(0, -1) : query;

        // Use the Product model to find products based on the query
        const filteredProducts = await Product.find({}).lean(); // Ensure the query returns plain JavaScript objects
        
        //console.log("Filtered products before filtering:", filteredProducts);

        // Filter products based on preprocessed product names
        const matchedProducts = filteredProducts.filter(product => {
          const productName = product.ProductName.replace(/\s/g, '').toLowerCase();
          return productName.includes(query) || query.includes(productName) || productName.includes(modifiedQuery);
        });

        //console.log("Matched products:", matchedProducts);

        res.json(matchedProducts);
      } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
  });

router.get('/category/:categoryName', async (req, res) => {
    try {
        const categoryName = req.params.categoryName; // Extract category name from URL params
        if(categoryName==null) 
        {
            const products = await Product.find().lean();
            res.status(200).json(products);
        }
        // Query the database to find products by category name
        const products = await Product.find({ ProductCategory: categoryName }).exec();

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for the specified category.' });
        }

        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products by category:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/category/:categoryName/:sub', async (req, res) => {
    try {
        const categoryName = req.params.categoryName; // Extract category name from URL params
        const subcategory = req.params.sub; // Extract subcategory from URL params

        let products;
        if (categoryName === 'all') {
            // If the category is 'all', fetch all products
            products = await Product.find().lean();
        } else {
            // Query the database to find products by both category and subcategory
            products = await Product.find({
                ProductCategory: categoryName,
                ProductType: subcategory
            }).lean();
        }

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for the specified category and subcategory.' });
        }

        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products by category and subcategory:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Delete Product by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.json(deletedProduct);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;

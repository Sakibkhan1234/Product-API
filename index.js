const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const { ObjectId } = require("mongodb");
const { getProductCollection } = require("../utils/AllDB_Collections/productCollection");


const productCollection = getProductCollection();


// feature product for home page


const getFeatureProduct = async (req, res) => {
    try {

        const products = await productCollection.find().limit(6).toArray();


        return res.send(products);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
};




const getProductCategoryName = async (req, res) => {
    try {
        const products = await productCollection.find({}, { projection: { category: 1, _id: 0 } }).toArray();

        const categories = products.map(product => product.category);

        const uniqueCategories = [...new Set(categories)];


        return res.send(uniqueCategories);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
};
const getProductBrandName = async (req, res) => {
    try {
        const products = await productCollection.find({}, { projection: { brand: 1, _id: 0 } }).toArray();

        const categories = products.map(product => product.brand);

        const uniqueBrands = [...new Set(categories)];


        return res.send(uniqueBrands);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
};


const getAllProduct = async (req, res) => {
    try {
        const {
            category,
            brand,
            sort,
            minPrice,
            maxPrice,
            search,
            page = 1,
            perPage = 9
        } = req.query;

        console.log(category, brand, sort, minPrice, maxPrice, search);

        const skip = (page - 1) * perPage;
        const limit = parseInt(perPage);

        const filters = {};
        if (category) filters.category = category;
        if (brand) filters.brand = brand;
        if (minPrice || maxPrice) filters.price = {};
        if (minPrice) filters.price.$gte = parseInt(minPrice);
        if (maxPrice) filters.price.$lte = parseInt(maxPrice);
        if (search) filters.productName = { $regex: search, $options: 'i' };

        const sortOptions = {};
        if (sort === 'priceAsc') {
            sortOptions.price = 1;
        } else if (sort === 'priceDesc') {
            sortOptions.price = -1;
        } else if (sort === 'ratings') {
            sortOptions.ratings = -1;
        } else {
            sortOptions.createdAt = -1; // default sort
        }



        const totalProducts = await productCollection.countDocuments(filters);
        const products = await productCollection.find(filters)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)
            .toArray();

        const totalPages = Math.ceil(totalProducts / perPage);

        res.json({
            products,
            totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching products' });
    }
};


//  product details Api

const getProductDetails = async (req, res) => {
    const id = req.params.id
    try {
        const result = await productCollection.findOne({ _id: new ObjectId(id) })
        return res.send(result)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching products' });
    }
}

const getAdminAllProduct = async (req, res) => {

    const { page = 1, limit = 8 } = req.query;

    try {
        const response = await productCollection.find()

            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .toArray();

        const total = await productCollection.countDocuments();

        return res.send({
            data: response,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
};


module.exports = {
    getFeatureProduct,
    getProductCategoryName,
    getProductBrandName,
    getAllProduct,
    getAdminAllProduct,
    getProductDetails,
}
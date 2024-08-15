const { getProductCollection } = require("../utils/AllDB_Collections/productCollection");


const productCollection= getProductCollection();

const getProductCategoryName = async (req, res) => {
    try {
        const products = await productCollection.find({}, { projection: { category: 1, _id: 0 } }).toArray();
        
        const categories = products.map(product => product.category);
        
        const uniqueCategories = [...new Set(categories)];
        console.log(categories.length);

        return res.send(uniqueCategories);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
};

  

module.exports = {
    getProductCategoryName,

}
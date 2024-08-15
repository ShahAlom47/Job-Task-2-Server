const express = require('express');
const router= express.Router()

const { getProductCategoryName, getProductBrandName, getAllProduct } = require('../Controller/product.controller');


router.get('/allProduct/categoryName',getProductCategoryName);
router.get('/allProduct/brandName',getProductBrandName);
router.get('/getallProducts',getAllProduct);



module.exports=router;
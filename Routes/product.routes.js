const express = require('express');
const router= express.Router()

const { getProductCategoryName, getProductBrandName } = require('../Controller/product.controller');


router.get('/allProduct/categoryName',getProductCategoryName);
router.get('/allProduct/brandName',getProductBrandName);



module.exports=router;
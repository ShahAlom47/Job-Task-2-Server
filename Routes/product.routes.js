const express = require('express');
const router= express.Router()

const { getProductCategoryName, getProductBrandName, getAllProduct, getAdminAllProduct } = require('../Controller/product.controller');


router.get('/allProduct/categoryName',getProductCategoryName);
router.get('/allProduct/brandName',getProductBrandName);
router.get('/getallProducts',getAllProduct);
router.get('/getAdminAllProducts',getAdminAllProduct);



module.exports=router;
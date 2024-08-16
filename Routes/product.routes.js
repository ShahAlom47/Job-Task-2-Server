const express = require('express');
const router= express.Router()

const { getProductCategoryName, getProductBrandName, getAllProduct, getAdminAllProduct, getFeatureProduct, getProductDetails } = require('../Controller/product.controller');


router.get('/getFeatureProduct',getFeatureProduct);
router.get('/allProduct/categoryName',getProductCategoryName);
router.get('/allProduct/brandName',getProductBrandName);
router.get('/getallProducts',getAllProduct);
router.get('/productDetails/:id',getProductDetails);
router.get('/getAdminAllProducts',getAdminAllProduct);



module.exports=router;
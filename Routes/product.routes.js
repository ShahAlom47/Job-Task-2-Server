const express = require('express');
const router= express.Router()

const { getProductCategoryName } = require('../Controller/product.controller');


router.get('/allProduct/categoryName',getProductCategoryName);



module.exports=router;
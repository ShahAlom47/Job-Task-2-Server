const { db } = require("../DB-connect");


const getProductCollection = () => {
    return db.collection('allProduct');
};

module.exports = { getProductCollection };
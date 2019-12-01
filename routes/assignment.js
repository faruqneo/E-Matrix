const routes = require('express').Router();
const auth = require('../middleware/auth');

//Controller modules
const {addCategory, getAllCategory, updateCategory, deleteCategory} = require('../controller/categoryController');
const {addProduct, getAllProduct, updateProduct, deleteProduct} = require('../controller/productController');
const {loging, signup} = require('../controller/userController');

/*
 @des Routes for login and singup 
*/
routes.post('/user/login', loging);
routes.post('/user/signup', signup);

/*
 @des Route for category
*/
routes
    .route('/category')
        .get(getAllCategory)
        .post(auth, addCategory)
        .put(auth, updateCategory)
        .delete(auth, deleteCategory)

/*
 @des Route for product
*/
routes
    .route('/product')
        .get(getAllProduct)
        .post(auth, addProduct)
        .put(auth, updateProduct)
        .delete(auth, deleteProduct)

module.exports = routes
const Product = require('../model/product');
const jwt = require('jsonwebtoken')
require('dotenv').config()

/*
     @des Fatching all products.
*/
const getAllProduct = async(req, res) => {
    try {
        const product = await Product.find().populate('categoryId');
        if(product.length)
        res.send(product);

        else
        res.status(401).json({msg: 'No products are exist.'});

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

/*
     @des Creating a product.
*/
const addProduct = async(req, res) => {
    try {
        
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ _id: data._id, 'tokens.token': token });

        if(user.role === 'Supervisor')
        {
            const product = await Product.create(req.body);
             res.send(product);
        }

        res.status(401).send({ error: 'You are not an supervisor .' })


    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

/*
     @des Updating a product.
*/
const updateProduct = async(req, res) => {
    try {
        
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ _id: data._id, 'tokens.token': token });


        const {name} = req.body;


        if(user.role === 'Supervisor'){

            await Product.updateOne({name}, req.body)
            res.send("product has been updated")
        }

        else
        res.send('You should be a Supervisor')


    } catch (error) {
        console.log(error);
        res.status(500).send(error) 
    }
}

/*
     @des Deleting a product.
*/
const deleteProduct = async(req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ _id: data._id, 'tokens.token': token });


        const {name} = req.body;


        if(user.role === 'Supervisor'){

            await Product.remove({name})
            res.send("product has been removed")
        }

        else
        res.send('You should be a Supervisor')
    } catch (error) {
        console.log(error);
        res.status(500).send(error) 
    }
}

module.exports = { addProduct, getAllProduct, updateProduct, deleteProduct }
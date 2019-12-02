const Category = require('../model/category');
const jwt = require('jsonwebtoken')
require('dotenv').config()

/*
     @des Fatching all categories.
*/
const getAllCategory = async(req, res) => {
    try {
        const category = await Category.find();

        if(category.length)
        res.send(category);

        else
        res.status(401).json({msg: 'No categories are exist.'});

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

/*
     @des Creating a category.
*/
const addCategory = async(req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })

        if(user.role === 'Admin')
        {
            const category = await Category.create(req.body);
            res.send(category);
        
        }

        res.status(401).send({ error: 'You are not an admin.' })

        
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

/*
     @des Updating a category.
*/
const updateCategory = async(req, res) => {
    try {
        
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ _id: data._id, 'tokens.token': token });


        const {title} = req.body;


        if(user.role === 'Admin'){

            await Category.updateOne({title}, req.body)
            res.send("category has been updated")
        }

        else
        res.send('You should be a Admin')


    } catch (error) {
        console.log(error);
        res.status(500).send(error) 
    }
}

/*
     @des Deleting a category.
*/
const deleteCategory = async(req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ _id: data._id, 'tokens.token': token });


        const {title} = req.body;


        if(user.role === 'Admin'){

            await Category.deleteOne({title})
            res.send("category has been removed")
        }

        else
        res.send('You should be a Supervisor')
    } catch (error) {
        console.log(error);
        res.status(500).send(error) 
    }
}

module.exports = { addCategory, getAllCategory, updateCategory, deleteCategory }
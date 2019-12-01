const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }, 
  categoryId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    //required: true
  }]
});

module.exports = Product = mongoose.model('Product', productSchema);
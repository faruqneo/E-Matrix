const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: [true, 'This title has already exist']
      },
      children: {
          type: Array
      }
});

module.exports = Category = mongoose.model('Category', categorySchema)
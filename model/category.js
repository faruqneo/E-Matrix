const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      children: {
          type: Array
      }
});

module.exports = Category = mongoose.model('Category', categorySchema)
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: {
            values: ['Admin', 'Supervisors'],
            message: 'Status is required.'
        },
        require: true,
        trim: true
    }
});

module.exports = User = mongoose.model('User', userSchema)
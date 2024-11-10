const mongoose = require('mongoose');

// Create Schema
const CartSchema = mongoose.Schema({
    userId: {
        type: String,
        required: false
    },
    products: {
        type: Array,
        required: true
    }
}, { timestamps: true });

// Create Model
const CartModel = mongoose.model('cart', CartSchema);

module.exports = {
    CartModel
};
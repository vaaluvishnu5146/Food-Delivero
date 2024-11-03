const mongoose = require('mongoose');

// Create Schema
const FoodSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    normalPrice: {
        type: Number,
        required: true,
        min: 30,
        max: 100
    },
    actualPrice: {
        type: Number,
        required: true,
        min: 30,
        max: 100
    },
}, { timestamps: true });

// Create Model
const FoodModel = mongoose.model('recipes', FoodSchema);

module.exports = {
    FoodModel
};
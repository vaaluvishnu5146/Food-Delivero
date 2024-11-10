const CartRouter = require("express").Router();
const { CartModel } = require('../model/Cart.model');

/**
 * GET ALL CART ITEMS
 */
CartRouter.get('/', (request, response) => {
    CartModel.find().then((result) => {
        if(result.length > 0) {
            return response.status(200).json({
                message: "Cart fetched successfully",
                data: result
            });
        } else {
            return response.status(200).json({
                message: "No Cart found"
            });
        }
    }).catch((error) => {
        return response.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    });
});


/**
 * CREATE A NEW CART ITEM
 */
CartRouter.post('/create', (request, response) => {
    const newCartItem = new CartModel(request.body);
    newCartItem.save().then((result) => {
        if(result && result._id) {
            return response.status(200).json({
                message: "Cart created"
            })
        } else {
            return response.status(200).json({
                message: "Internal server error"
            })
        }
    }).catch((error) => {
        return response.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    })
});

module.exports = CartRouter;
const FoodRouter = require("express").Router();

/**
 * GET ALL THE AVAILABLE FOODS
 * METHOD = GET
 */
FoodRouter.get('/', function (request, response) {
    return response.status(200).json({
        message: "Foods fetched successfully"
    });
});

/**
 * GET ALL THE AVAILABLE FOODS
 * METHOD = GET
 */
FoodRouter.get('/food/:foodId', function (request, response) {
    return response.status(200).json({
        message: "Food fetched successfully"
    });
});

/**
 * CREATE A NEW FOOD
 * METHOD = POST
 */
FoodRouter.post('/create', function (request, response) {
    return response.status(200).json({
        message: "Food created successfully",
        data: request.body
    });
});

module.exports = FoodRouter;
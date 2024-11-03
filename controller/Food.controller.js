const FoodRouter = require("express").Router();
const { FoodModel } = require("../model/Food.model");
/**
 * GET ALL THE AVAILABLE FOODS
 * METHOD = GET
 */
FoodRouter.get('/', function (request, response) {
    FoodModel.find().then((result) => {
        if (result && result.length > 0) {
            return response.status(200).json({
                message: "Foods fetched successfully",
                data: result
            });
        } else {
            return response.status(200).json({
                message: "No Foods found",
                data: result
            });
        }
    }).catch((error) => {
        return response.status(200).json({
            message: "Something went wrong"
        });
    })
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
    const food = new FoodModel(request.body);
    food.save().then((result) => {
       if(result && result._id) {
            return response.status(201).json({
                message: "Food created successfully",
            });
       } else {
        return response.status(500).json({
            message: "Internal server error",
            data: result,
        });
       }
    }).catch((error) => {
        return response.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    })
});

/**
 * UPDATE A FOOD
 * METHOD = POST
 */
FoodRouter.patch('/update/:foodId', function (request, response) {
    FoodModel.findOneAndUpdate({ _id: request.params.foodId }, request.body).then((result) => {
       if(result && result._id) {
            return response.status(201).json({
                message: "Food updated successfully",
            });
       } else {
        return response.status(500).json({
            message: "Internal server error",
            data: result,
        });
       }
    }).catch((error) => {
        return response.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    })
});

module.exports = FoodRouter;
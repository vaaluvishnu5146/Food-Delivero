const FoodRouter = require("express").Router();
const {client, dbName} = require("../dbConfig");
const ObjectId = require('mongodb').ObjectId;

/**
 * GET ALL THE AVAILABLE FOODS
 * METHOD = GET
 */
FoodRouter.get('/', async function (request, response) {
    try {
        // Open client connection
        await client.connect();
        // Prepare Query Statement
        const result = await client
            .db(dbName)
            .collection("recipes")
            .find()
            .toArray();
        // close client connection
        client.close();
        // Returns the response
        return response
            .status(200)
            .json({message: "Foods fetched successfully", data: result});
    } catch (error) {
        // Return error response
        return response
            .status(400)
            .json({message: "Error finding foods"});
    }
});

/**
 * GET ALL THE AVAILABLE FOODS
 * METHOD = GET
 */
FoodRouter.get('/food/:foodId', async function (request, response) {
    // Open client connection
    await client.connect();

    client
        .db(dbName)
        .collection("recipes")
        .findOne({
            _id: new ObjectId(request.params.foodId)
        })
        .then((result) => {
            if (result) {
                return response
                    .status(200)
                    .json({data: result, message: "Food fetched successfully"});
            } else {
                return response
                    .status(404)
                    .json({message: "No Food found"});
            }
        })
        .catch((error) => {
            console.log(error)
            return response
                .status(400)
                .json({error: error.message, message: "Something went wrong"});
        })
        . finally(() => {
            // close client connection
            client.close();
        });
});

/**
 * CREATE A NEW FOOD
 * METHOD = POST
 */
FoodRouter.post('/create', async function (request, response) {
    try {
        // Open client connection
        await client.connect();
        const result = await client
            .db(dbName)
            .collection('recipes')
            .insertOne(request.body);
        await client.close();
        if (result) {
            return response
                .status(200)
                .json({message: "Food created successfully", data: request.body});
        } else {
            return response
                .status(500)
                .json({message: "Food creation successfully"});
        }
    } catch (error) {
        await client.close();
        return response
            .status(400)
            .json({message: "Something went wrong!"});
    }
});



/**
 * Description = A Route that helps to update a food
 * Method = UPDATE
 */
FoodRouter.patch('/food/:foodId/update', async function (request, response) {
    try {
        await client.connect();
        const result = await client
                            .db(dbName)
                            .collection('recipes')
                            .findOneAndUpdate({
                                _id: new ObjectId(request.params.foodId)
                            }, { $set: request.body });
        client.close();
        if (result) {
            return response.status(200).json({message: "Food updated successfully"});
        } else {
            return response.status(404).json({message: "Document with specified ID not found"});
        }
    } catch (error) {
        client.close();
        return response.status(400).json({
            error: error.message,
            message: "Bad request"
        });
    }    
})

/**
 * Description = A Route that helps to delete a food
 * Method = DELETE
 */
FoodRouter.delete('/delete/:foodId', async function (request, response) {
    try {
        await client.connect();
        const result = await client
                            .db(dbName)
                            .collection('recipes')
                            .findOneAndDelete({
                                _id: new ObjectId(request.params.foodId)
                            });
        client.close();
        if (result) {
            return response.status(200).json({message: "Food deleted successfully"});
        } else {
            return response.status(404).json({message: "Document with specified ID not found"});
        }
    } catch (error) {
        client.close();
        return response.status(400).json({
            error: error.message,
            message: "Bad request"
        });
    }
})

module.exports = FoodRouter;
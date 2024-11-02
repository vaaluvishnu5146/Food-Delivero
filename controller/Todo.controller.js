const TodoRouter = require("express").Router();
const Todos = require("../mocks/todos.json");

/**
 * GET ALL THE AVAILABLE TODOS
 * METHOD = GET
 */
TodoRouter.get('/', function (request, response) {
    let limitedData = [...Todos];
    if(request.query.limit && request.query.page) {
        const start = (Number(request.query.page) - 1) * Number(request.query.limit);
        const end = Number(request.query.page)  * Number(request.query.limit);
        limitedData = limitedData.slice(start, end);
    }
    return response.status(200).json({
        data: limitedData,
        message: "Todos fetched successfully"
    });
});

/**
 * GET THE AVAILABLE TODO MATCHING todoId
 * METHOD = GET
 */
TodoRouter.get('/todo/:todoId', function (request, response) {
    const matchingTodo = Todos.find((d) => d.todoId === Number(request.params.todoId));
    if(matchingTodo) {
        return response.status(200).json({
            data: matchingTodo,
            message: "Todo fetched successfully"
        });
    }
    return response.status(404).json({
        data: {},
        message: "No Todo Found"
    });
});


module.exports = TodoRouter;
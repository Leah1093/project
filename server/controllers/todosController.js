import { ItemService } from '../service/itemsService.js';
export default class TodosController {

    async getTodos(req, res, next) {
        console.log("function get todos")
        try {
            const todoService = new ItemService("todo");
            const resultItems = await todoService.getItems(req)
            if (resultItems.length == 0)
            throw new Error("No elements found")
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            switch(ex.message)
            {
                case "No elements found":
                    err.statusCode = 407;
                    break;
                default:
                    err.statusCode = 500;
                    break;
            }            
            err.message = ex;
            next(err)
        }
    }

    async addTodo(req, res) {
        console.log("function add todo")
        try {
            const todoService = new ItemService("todo");
            await todoService.postItem(req.body);
            return res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async deleteTodoById(req, res) {
        console.log("function delete todo")
        try {
            const todoService = new ItemService("todo");
            await todoService.deleteItem(req.params.id);
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateTodoById(req, res) {
        console.log("function update todo")
        try {
            const todoService = new ItemService("todo");
            await todoService.updateItem(req.body,req.params.id);
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}
import { ItemService } from '../service/itemsService.js';
export default class TodosController {

    async getTodos(req, res, next) {
        try {
            const todoService = new ItemService("todo");
            const resultItems = await todoService.getAllItems()
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getTodoById(req, res, next) {
        try {
              const todoService = new ItemService("todo");
            const resultItem = await todoService.getItemByid(req.params.id);
            return res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }

    }

    async addTodo(req, res) {
        try {
            const todoService = new ItemService("todo");
            console.log(req.body)
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
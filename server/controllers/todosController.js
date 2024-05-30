import { TodoService } from '../service/todoService.js';
export default class TodosController {

    async getTodos(req, res, next) {
        console.log("function get todos")
        try {
            const todoService = new TodoService();
            const resultTodos = await todoService.getTodos(req)
            return res.status(200).json(resultTodos);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err);
        }
    }

    async addTodo(req, res,next) {
        console.log("function add todo") 
        console.log("😅  "+req.body.title)
        try {
            const todoService = new TodoService();
            await todoService.postTodo(req.body);
           
            return res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err);
        }
    }

    async deleteTodoById(req, res,next) {
        console.log("function delete todo")
        try {
            const todoService = new TodoService();
            await todoService.deleteTodo(req.params.id,"id");
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err)
        }
    }

    async updateTodoById(req, res,next) {
        console.log("function update todo")
        try {
            const todoService = new TodoService();
            await todoService.updateTodo(req.body, req.params.id);
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err)
        }
    }
}
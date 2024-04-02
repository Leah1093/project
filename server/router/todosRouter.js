import express from "express";
import todosController from '../controllers/todosController.js'
const todoRouter = express.Router();

const todoController = new todosController();

todoRouter.get("/:id",todoController.getTodos);
todoRouter.get("/",todoController.getTodos);
todoRouter.post("/",todoController.addTodo);
todoRouter.delete("/:id",todoController.deleteTodoById);
todoRouter.put("/:id",todoController.updateTodoById);


export {
    todoRouter 
}




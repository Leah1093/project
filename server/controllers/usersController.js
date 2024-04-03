import { ItemService } from '../service/itemsService.js';
export default class UsersController {


    async getUsers(req, res, next) {
        try {
            console.log("function get all users")
            const todoService = new ItemService("user");
            const resultItems = await todoService.getItems(req)
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addUser(req, res) {
        console.log("function add user")
        try {
            const userService = new ItemService("user");
            console.log(req.body)
            await userService.postItem(req.body);
            return res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async deleteUserById(req, res) {
        console.log("function delete user")
        try {
            const userService = new ItemService("user");
            await userService.deleteItem(req.params.id);
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateUserById(req, res) {
        console.log("function update user")
        try {
            const userService = new ItemService("user");
            await userService.updateItem(req.body,req.params.id);
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
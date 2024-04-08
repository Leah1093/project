import { ItemService } from '../service/itemsService.js';

export default class UsersController {


    async getUsers(req, res, next) {
        try {
            console.log("function get all users")
            const todoService = new ItemService("user");
            const resultItems = await todoService.getItems(req)
            if (resultItems.length == 0)
                throw new Error("No elements found")
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            switch (err.message) {
                case "No elements found":
                    err.statusCode = 404;
                    break;
                case "Element already exists":
                    err.statusCode = 409;
                    break;
                default:
                    err.statusCode = 500;
                    break;
            }
            err.message = ex;
            next(err)
        }
    }

    async addUser(req, res) {
        console.log("function add user")
        try {
            let signedUp = { query: { username: req.body[0].username }, params: { id: null } }

            const userServicee = new ItemService("user");

            const resultGetItems = await userServicee.getItems(signedUp);
            if (resultGetItems.length == 0) {

                const resultAddUser = await userServicee.postItem(req.body[0]);
                const resultGetItem = await userServicee.getItems(signedUp);

                // const getNewUser = await userServicee.getItems(signedUp);
                const userPasswordService = new ItemService("userpassword");

                const resultAddPassword = await userPasswordService.postItem({ id: resultGetItem[0].id, password: req.body[1].password });
                return res.status(200).json({ status: 200 });
            } else {
                throw new Error("No elements found")
            }
        }
        catch (ex) {
            const err = {}
            switch (ex.message) {
                case 'No elements found':
                    err.statusCode = 404;
                    break;
                case "Element already exists":
                    err.statusCode = 409;
                    break;
                default:
                    err.statusCode = 500;
                    break;
            }
            err.message = ex.message;
            
            next(err);
        }
    }

    async editPassword(req, res) {
        try {
            let editUser = { query: { username: req.body[0].username }, params: { id: null } }
            const userServicee = new ItemService("user");
            const resultGetItems = await userServicee.getItems(editUser);
            if (resultGetItems.length != 0) {
                const userPasswordService = new ItemService("userpassword");
                const resultAddPassword = await userPasswordService.getItems({ query: null, params: { id: resultGetItems[0].id } });
                if (resultAddPassword[0].password == req.body[0].password) {
                    const editPassword = await userPasswordService.updateItem({ password: req.body[1].password }, resultGetItems[0].id);
                    return res.status(200).json({ status: 200 });
                }
                else {
                    throw new Error('Authentication failed')
                }
            } else {
                throw new Error("No elements found");
            }

        }
        catch (ex) {
            const err = {};
            switch (err.message) {
                case 'Authentication failed':
                    err.statusCode = 407;
                    break;
                case "No such user exists":
                    err.statusCode = 404;
                    break;
                case "No elements found":
                    err.statusCode = 404;
                    break;
                default:
                    err.statusCode = 500;
                    break;
            }
            err.message = ex;
            next(err)
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
            await userService.updateItem(req.body, req.params.id);
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
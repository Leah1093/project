import { UserService } from '../service/userService.js';
import { sha256 } from 'js-sha256'

export default class UsersController {

    async addUser(req, res, next) {
        console.log("function add user")
        try {
            let signedUp = { query: { username: req.body[0].username }, params: { id: null } }
            const userServicee = new UserService("user");
            const resultGetUsers = await userServicee.getUsers(signedUp);
            if (resultGetUsers.length == 0) {
                const resultAddUser = await userServicee.postUser(req.body[0]);
                const resultGetUser = await userServicee.getUsers(signedUp);
                const userPasswordService = new UserService("userpassword");
                const resultAddPassword = await userPasswordService.postUser({ id: resultGetUser[0].id, password: sha256(req.body[1].password) });
                return res.status(200).json({ token:{ token }, status: 200 });
            } else
                throw new Error("Element already exists")
        }
        catch (ex) {
            const err = {}
            switch (ex.message) {
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
            err.message = ex.message;
            next(err)
        }
    }

    async getUsers(req, res, next) {
        try {
            console.log("function get all users")
            const userService = new UserService("user");
            const resultUsers = await userService.getUsers(req)
            if (resultUsers.length == 0)
                throw new Error("No elements found")
            return res.status(200).json(resultUsers);
        }
        catch (ex) {
            const err = {}
            switch (ex.message) {
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
            err.message = ex.message;
            next(err)
        }
    }



    async editPassword(req, res, next) {
        try {
            let editUser = { query: { username: req.body[0].username }, params: { id: null } }
            const userServicee = new UserService("user");
            const resultGetUsers = await userServicee.getUsers(editUser);
            if (resultGetUsers.length != 0) {
                const userPasswordService = new UserService("userpassword");
                const resultAddPassword = await userPasswordService.getUsers({ query: null, params: { id: resultGetUsers[0].id } });
                if (resultAddPassword[0].password == sha256(req.body[0].password)) {
                    const editPassword = await userPasswordService.updateUser({ password: sha256(req.body[1].password) }, resultGetUsers[0].id);
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
            switch (ex.message) {
                case 'Authentication failed':
                    err.statusCode = 407;
                    break;
                case "No elements found":
                    err.statusCode = 404;
                    break;
                default:
                    err.statusCode = 500;
                    break;
            }
            err.message = ex.message;
            next(err)
        }
    }

    async deleteUserById(req, res, next) {
        console.log("function delete user")
        try {
            const userServicee = new UserService("user");
            const resultGetUsers = await userServicee.getUsers(req);
            if (resultGetUsers.length != 0) {
                const todoServicee = new UserService("todo");
                const resultdeletTodo = await todoServicee.deleteUser(resultGetUsers[0].userId, "userId");
                const passwordService = new UserService("userpassword");
                const resultdeletPassword = await passwordService.deleteUser(resultGetUsers[0].id, "id");
                const userServicee = new UserService("user");
                const resultdeletUser = await userServicee.deleteUser(resultGetUsers[0].userId, "userId");
            } else {
                throw new Error("No elements found");
            }
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err)
        }
    }

    async updateUserById(req, res, next) {
        console.log("function update user")
        try {
            const userService = new UserService("user");
            await userService.updateUser(req.body, req.params.id);
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
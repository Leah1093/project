import { UserService } from '../service/usersService.js';
export default class UsersController {


    async getUsers(req, res, next) {
        try {
            const userService = new UserService();
            const resultItems = await userService.getAllUsers()
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }

    }

    async getUserById(req, res, next) {
        try {
            console.log()
            const userService = new UserService();
            const resultItem = await userService.getUsertByid(req.params.id);
            return res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }

    }

    async addUser(req, res) {
        try {
            const userService = new UserService();
            console.log(req.body)
            await userService.postUser(req.body);

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
        try {
            const userService = new UserService();
            await userService.deleteUser(req.params.id);
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
        try {
            const userService = new UserService();

            await userService.updateUser(req.body);
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
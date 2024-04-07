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
            let signedUp = { query: { username: req.body[0].username }, params: { id: null } }
            const userServicee = new ItemService("user");
            const resultGetItems = await userServicee.getItems(signedUp);
            if (!resultGetItems[0]) {

                const resultAddUser = await userServicee.postItem(req.body[0])
                // let id=resultAddUser.id;
                const getNewUser = await userServicee.getItems(signedUp);
                const userPasswordService = new ItemService("userpassword");
                const resultAddPassword = await userPasswordService.postItem({ id: getNewUser[0].id, password: req.body[1].password });
                return res.status(200).json({ status: 200 });
            }
            else
                return res.status(409).json({ status: 409 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async editPassword(req, res) {
        try {
            let editUser = { query: { username: req.body[0].username }, params: { id: null } }
            const userServicee = new ItemService("user");
            const resultGetItems = await userServicee.getItems(editUser);
            if (resultGetItems[0]) {
                const userPasswordService = new ItemService("userpassword");
                const resultAddPassword = await userPasswordService.getItems({query:null, params: { id: resultGetItems[0].id } });
                if (resultAddPassword[0].password == req.body[0].password) {
                    console.log("😒"+req.body[1].password)
                    const editPassword = await userPasswordService.updateItem({password:req.body[1].password}, resultGetItems[0].id);
                return res.status(200).json({ status: 200 });
                }
                else{
                    console.log("הקוד לא שווה")
                }
            }
            else
            console.log("אין כזה משתמש")

        } catch {

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
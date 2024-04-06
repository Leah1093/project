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
            let signedUp = { query: { username: req.body[0].username },params:{id:null} }
            const userServicee = new ItemService("user");
            console.log("🛬🛫✈️🛩️     " + signedUp.query.username)
            const resultGetItems = await userServicee.getItems(signedUp);
            console.log("🛩️     " + resultGetItems.id)
            
            if (!resultGetItems.id) {
               
                const resultAddUser = await userServicee.postItem(req.body[0])
                // let id=resultAddUser.id;
                const getNewUser=await userServicee.getItems(signedUp);
                const userPasswordService = new ItemService("userpassword");
                const resultAddPassword = await userPasswordService.postItem({id:getNewUser[0].id,password:req.body[1].password});       
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
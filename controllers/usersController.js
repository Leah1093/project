import { getAllUsers, getUsertByid } from '../service/usersService.js';
export default class UsersController {


    async getUsers(req, res, next) {
        try {

            const data = await getAllUsers();
            return res.json(data);
            //service
        }
        catch (err) {
           // return res.statusCode(404).end("err")
        }

    }
    async getUserById(req, res, next) {
        try {
            const data = await getUsertByid(req.params.id);
            return res.json(data);
            //service
        }
        catch (err) {
            console.log("err")
            // return res.statusCode(404).end("err")
        }

    }

    // addUser(req, res, next) {
    //     try {
    //         console.log("post user")
    //         console.log(req.body)

    //     }
    //     catch (err) {
    //         return res.statusCode(404).end("err")
    //     }

    // }
}
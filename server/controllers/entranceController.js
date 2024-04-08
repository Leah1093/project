import { ItemService } from '../service/itemsService.js';
import { sha256 } from 'js-sha256'


export default class EntranceController {
    // async register(req, res) {
    //     console.log("function register")
    //     try {
    //         const registerService = new ItemService("user");
    //         await registerService.getItems(req.body);
    //         return res.status(200).json({ status: 200 });
    //     }
    //     catch (ex) {
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err);
    //     }
    // }

    async login(req, res, next) {
        console.log("function login");
        try {
            let logUser = { query: { username: req.body.username }, params: { id: null } }
            const userService = new ItemService("user");
            const resultItems = await userService.getItems(logUser);
            if (resultItems.length == 0)
                throw new Error("No elements found");
            const loginService = new ItemService("userpassword");
            let pas = await loginService.password(req.body.username);
            if (pas[0].password == sha256(req.body.password)) {
                const authorizedUser = {
                    userId: resultItems[0].userId,
                    name: resultItems[0].name,
                    username: resultItems[0].username,
                    email: resultItems[0].email,
                    phone: resultItems[0].phone
                }
                return res.status(200).json({ data: authorizedUser, status: 200 });
            }
            else {
                return res.status(404).json({ status: 404 });
            }
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
}
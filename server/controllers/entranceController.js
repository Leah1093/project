import { ItemService } from '../service/itemsService.js';


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

    async login(req, res) {
        console.log("function login")
        try {
            const todoService = new ItemService("userpassword");
            let pas = await todoService.password(req.body.username);
            if (pas[0].password == req.body.password)
                return res.status(200).json({ status: 200 });
            else {
                return res.status(404).json({ status: 404 });

            }
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }
}
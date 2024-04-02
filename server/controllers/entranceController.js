import { ItemService } from '../service/itemsService.js';
async function getPassword(id, password) {
    console.log("🎨🧵" + password + id);
    const todoService2 = new ItemService("userpassword");
    const resultItem = await todoService2.getItems({
        id: id,
        password: password,
        params: { id: null }
    });
    console.log("🎃🎊✨🧨🎇🎈✨" + resultItem)

}

export default class EntranceController {


    // async login(req, res, next) {
    //     try {
    //         const todoService = new ItemService("user");
    //         const resultItems = await todoService.getItems(req)
    //         console.log("🎃🎊✨" + Object.values(resultItems[0])[0])
    //         if (Object.keys(resultItems[0])[0]) {
    //            await getPassword(Object.values(resultItems[0])[0],req.query.password);
    //             }
    //         console.log("🎃🎊✨fhfhfh")
    //         // return res.status(200).json(resultItems);
    //     }
    //     catch (ex) {
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err)
    //     }
    // }

    // async getUsers(req, res, next) {
    //     try {
    //         const todoService = new ItemService("user");
    //         const resultItems = await todoService.getItems(req)
    //         return res.status(200).json(resultItems);
    //     }
    //     catch (ex) {
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err)
    //     }
    // }

    async register(req, res) {
        try {
            const todoService = new ItemService("todo");
            await todoService.postItem(req.body);
            return res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            // next(err);
        }
    }

    async login(req, res) {
        try {
            const todoService = new ItemService("userpassword");
            console.log("🎈🎈🎈" + req.query.username)
            let pas = await todoService.password(req.query.username);
            console.log("🎈🎈🎈" + pas[0].password);
            if (pas[0].password == req.query.password)
                return res.status(200).json({ status: 200 });
            else {
                return res.status(404).json({ status: 404 });

            }
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            // next(err);
        }
    }
}
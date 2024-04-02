import { ItemService } from '../service/itemsService.js';
async function getPassword(id,password){
    console.log("🎨🧵" + password+id);
    const todoService2 = new ItemService("userpassword");
    const resultItem = await todoService2.getItems({
        id:id,
        password:password,
        params:{id:null}
    });
    console.log("🎃🎊✨🧨🎇🎈✨" +resultItem)

}

export default class EntranceController {


    async login(req, res, next) {
        try {
            const todoService = new ItemService("user");
            const resultItems = await todoService.getItems(req)
            console.log("🎃🎊✨" + Object.values(resultItems[0])[0])
            if (Object.keys(resultItems[0])[0]) {
               await getPassword(Object.values(resultItems[0])[0],req.query.password);
                }
            console.log("🎃🎊✨fhfhfh")
            // return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

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
            next(err);
        }
    }


}
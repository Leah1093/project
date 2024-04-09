// import { ItemService } from '../service/itemsService.js';
// import { sha256 } from 'js-sha256'


// export default class EntranceController {
//     // async register(req, res) {
//     //     console.log("function register")
//     //     try {
//     //         const registerService = new ItemService("user");
//     //         await registerService.getItems(req.body);
//     //         return res.status(200).json({ status: 200 });
//     //     }
//     //     catch (ex) {
//     //         const err = {}
//     //         err.statusCode = 500;
//     //         err.message = ex;
//     //         next(err);
//     //     }
//     // }

//     async login(req, res, next) {
//         console.log("function login");
//         try {
//             let logUser = { query: { username: req.body.username }, params: { id: null } }
//             const userService = new ItemService("user");
//             const resultItems = await userService.getItems(logUser);
//             if (resultItems.length == 0)
//                 throw new Error("No elements found");
//             const loginService = new ItemService("userpassword");
//             let pas = await loginService.password(req.body.username);
//             if (pas[0].password == sha256(req.body.password)) {
//                 const authorizedUser = {
//                     userId: resultItems[0].userId,
//                     name: resultItems[0].name,
//                     username: resultItems[0].username,
//                     email: resultItems[0].email,
//                     phone: resultItems[0].phone
//                 }
//                 return res.status(200).json({ data: authorizedUser, status: 200 });
//             }
//             else {
//                 return res.status(404).json({ status: 404 });
//             }
//         }
//         catch (ex) {
//             const err = {}
//             switch (ex.message) {
//                 case "No elements found":
//                     err.statusCode = 404;
//                     break;
//                 case "Element already exists":
//                     err.statusCode = 409;
//                     break;
//                 default:
//                     err.statusCode = 500;
//                     break;
//             }
//             err.message = ex.message;
//             next(err)
//         }
//     }
// }



import { ItemService } from '../service/itemsService.js';
import { sha256 } from 'js-sha256';
import jwt from 'jsonwebtoken'; // ייבוא ספריית JWT
import 'dotenv/config'

export default class EntranceController {
    async login(req, res, next) {
        console.log("function login");
        try {
            let logUser = { query: { username: req.body.username }, params: { id: null } };
            const userService = new ItemService("user");
            const resultItems = await userService.getItems(logUser);

            if (resultItems.length === 0) {
                throw new Error("No elements found");
            }

            const loginService = new ItemService("userpassword");
            let passwordHash = await loginService.password(req.body.username);

            if (passwordHash[0].password === sha256(req.body.password)) {
                const authorizedUser = {
                    userId: resultItems[0].userId,
                    name: resultItems[0].name,
                    username: resultItems[0].username,
                    email: resultItems[0].email,
                    phone: resultItems[0].phone,
                };
                const token = jwt.sign(authorizedUser, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                });

                return res.status(200).json({ data:authorizedUser ,token:{ token }, status: 200 });
            } else {
                return res.status(404).json({ status: 404 });
            }
        } catch (ex) {
            const err = {};
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
            next(err);
        }
    }



    async register(req, res, next) {
        console.log("function add user")
        try {
            let signedUp = { query: { username: req.body[0].username }, params: { id: null } }
            const userServicee = new ItemService("user");
            const resultGetItems = await userServicee.getItems(signedUp);
            if (resultGetItems.length == 0) {
                const resultAddUser = await userServicee.postItem(req.body[0]);
                const resultGetItem = await userServicee.getItems(signedUp);
                const userPasswordService = new ItemService("userpassword");
                const resultAddPassword = await userPasswordService.postItem({ id: resultGetItem[0].id, password: sha256(req.body[1].password) });
                const authorizedUser = {
                    userId: resultGetItem[0].userId,
                    name: resultGetItem[0].name,
                    username: resultGetItem[0].username,
                    email: resultGetItem[0].email,
                    phone: resultGetItem[0].phone,
                };
                const token = jwt.sign(authorizedUser, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                });
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
            const userService = new ItemService("user");
            const resultItems = await userService.getItems(req)
            if (resultItems.length == 0)
                throw new Error("No elements found")
            return res.status(200).json(resultItems);
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
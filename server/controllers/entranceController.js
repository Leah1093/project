import { UserService } from '../service/userService.js';
import { sha256 } from 'js-sha256';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

export default class EntranceController {

    async login(req, res, next) {
        try {
            let logUser = { query: { username: req.body.username }, params: { id: null } };
            const userService = new UserService("user");
            const resultUsers = await userService.getUsers(logUser);
            if (resultUsers.length === 0) {
                throw new Error("No elements found");
            }
            const loginService = new UserService("userpassword");
            let passwordHash = await loginService.password(req.body.username);
            if (passwordHash[0].password === sha256(req.body.password)) {
                const authorizedUser = {
                    userId: resultUsers[0].userId,
                    name: resultUsers[0].name,
                    username: resultUsers[0].username,
                    email: resultUsers[0].email,
                    phone: resultUsers[0].phone,
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
        try {
            let signedUp = { query: { username: req.body[0].username }, params: { id: null } }
            const userServicee = new UserService("user");
            const resultGetUsers = await userServicee.getUsers(signedUp);
            if (resultGetUsers.length == 0) {
                const resultAddUser = await userServicee.postUser(req.body[0]);
                const resultGetUser = await userServicee.getUsers(signedUp);
                const userPasswordService = new UserService("userpassword");
                const resultAddPassword = await userPasswordService.postUser({ id: resultGetUser[0].id, password: sha256(req.body[1].password) });
                const authorizedUser = {
                    userId: req.body[0].userId,
                    name: req.body[0].name,
                    username: req.body[0].username,
                    email: req.body[0].email,
                    phone: req.body[0].phone,
                };
                const token = jwt.sign(authorizedUser, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                });
                console.log("fds😅😅😅"+token)
                return res.status(200).json({ data:authorizedUser ,token:{ token }, status: 200 });
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

}
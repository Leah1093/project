import express from "express";
import usersController from '../controllers/usersController.js'
const userRouter = express.Router();
console.log("123")
const user = new usersController();

userRouter.get("/:id",user.getUserById)

userRouter.get("/",user.getUsers);
console.log("123554")
export {
    userRouter
}
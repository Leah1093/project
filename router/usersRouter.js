import express from "express";
import usersController from '../controllers/usersController.js'
const userRouter = express.Router();

const user = new usersController();

userRouter.get("/:id",user.getUserById)

userRouter.get("/",user.getUsers);

export {
    userRouter
}
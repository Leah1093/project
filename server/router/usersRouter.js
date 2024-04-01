import express from "express";
import usersController from '../controllers/usersController.js'
const userRouter = express.Router();
console.log("🚗🚗🚗🚚"+userRouter)
const userController = new usersController();

userRouter.get("/:id",userController.getUserById)
userRouter.get("/",userController.getUsers);
userRouter.post("/",userController.addUser);
userRouter.delete("/:id",userController.deleteUserById);
userRouter.put("/:id",userController.updateUserById);


export {
    userRouter
}
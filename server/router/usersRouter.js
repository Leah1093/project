import express from "express";
import usersController from '../controllers/usersController.js'
const userRouter = express.Router();
const userController = new usersController();

userRouter.get("/:id",userController.getUsers)
userRouter.get("/",userController.getUsers);
userRouter.post("/",userController.addUser);
userRouter.put("/",userController.editPassword);
userRouter.delete("/",userController.deleteUserById);
userRouter.put("/:id",userController.updateUserById);

export {
    userRouter
}
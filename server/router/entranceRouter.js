import express from "express";
import entranceController from '../controllers/entranceController.js'
const entranceRouter = express.Router();

const entrController = new entranceController();

entranceRouter.get("/login",entrController.login)
entranceRouter.get("/register",entrController.register);

export {
    entranceRouter 
}




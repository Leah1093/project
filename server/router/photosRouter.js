import express from "express";
import photosController from '../controllers/photosController.js'
const photoRouter = express.Router();

const photoController = new photosController();

photoRouter.get("/:id",photoController.getPhotos)
photoRouter.get("/",photoController.getPhotos);
photoRouter.post("/",photoController.addPhoto);
photoRouter.delete("/:id",photoController.deletePhotoById);
photoRouter.put("/:id",photoController.updatePhotoById);


export {
    photoRouter
}
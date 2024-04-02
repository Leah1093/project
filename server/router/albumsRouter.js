import express from "express";
import albumsController from '../controllers/albumsController.js'
const albumRouter = express.Router();

const albumController = new albumsController();

albumRouter.get("/:id",albumController.getAlbums)
albumRouter.get("/",albumController.getAlbums);
albumRouter.post("/",albumController.addAlbum);
albumRouter.delete("/:id",albumController.deleteAlbumById);
albumRouter.put("/:id",albumController.updateAlbumById);


export {
    albumRouter
}
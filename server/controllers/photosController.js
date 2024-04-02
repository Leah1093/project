import { ItemService } from '../service/itemsService.js';
export default class PhotosController {


    async getPhotos(req, res, next) {
        try {
            const photoService = new ItemService("photo");
            const resultItems = await photoService.getItems(req)
            return res.status(200).json(resultItems)
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addPhoto(req, res) {
        try {
            const photoService = new ItemService("photo");
            console.log(req.body)
            await photoService.postItem(req.body);

            return res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async deletePhotoById(req, res) {
        try {
            const photoService = new ItemService("photo");
            await photoService.deleteItem(req.params.id);
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updatePhotoById(req, res) {
        try {
            const photoService = new ItemService("photo");
            await photoService.updateItem(req.body,req.params.id);
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}
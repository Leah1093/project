import { ItemService } from '../service/itemsService.js';
export default class AlbumsController {


    async getAlbums(req, res, next) {
        try {
            const albumService = new ItemService("album");
            const resultItems = await albumService.getItems(req)
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addAlbum(req, res) {
        try {
            const albumService = new ItemService("album");
            console.log(req.body)
            await albumService.postItem(req.body);

            return res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async deleteAlbumById(req, res) {
        try {
            const albumService = new ItemService("album");
            await albumService.deleteItem(req.params.id);
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateAlbumById(req, res) {
        try {
            const albumService = new ItemService("album");
            await albumService.updateItem(req.body,req.params.id);
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
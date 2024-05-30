import { AlbumService } from '../service/albumService.js';
export default class AlbumsController {


    async getAlbums(req, res, next) {
        console.log("function get albums")
        try {
            const albumService = new AlbumService();
            const resultAlbums = await albumService.getAlbums(req)
            return res.status(200).json(resultAlbums);
        }

        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err);
        }
    }

    async addAlbum(req, res) {
        console.log("function add album")
        try {
            const albumService = new AlbumService();
            console.log(req.body)
            await albumService.postAlbum(req.body);

            return res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err);
        }
    }

    async deleteAlbumById(req, res,next) {
        console.log("function delete album")
        try {
            const albumService = new AlbumService();
            await albumService.deleteAlbum(req.params.id,"id");
            const photoService = new AlbumService("photo");
            await photoService.deleteAlbum(req.params.id,"id");
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err)
        }
    }

    async updateAlbumById(req, res) {
        console.log("function update album")
        try {
            const albumService = new AlbumService();
            await albumService.updateAlbum(req.body, req.params.id);
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err)
        }
    }
}
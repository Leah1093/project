import { PhotoService } from '../service/photoService.js';
export default class PhotosController {

    async getPhotos(req, res, next) {
        console.log("function get photos with page");
        try {
            const photoService = new PhotoService();
            const resultPhotos = await photoService.getPhotosByPage(req);
            const hasMorePhotos = await photoService.getCountOfPhotos();
            let hasMore = true;
            hasMorePhotos[0].count % 10 == 0 ? (hasMorePhotos[0].count / 10 == req.query.page && (hasMore = false))
                : ((parseInt(hasMorePhotos[0].count / 10) + 1) == req.query.page && (hasMore = false))
            return res.status(200).json({ data: resultPhotos, hasMore: hasMore })
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err);
        }
    }

    async addPhoto(req, res, next) {
        console.log("function add photo")
        try {
            console.log("addPhoto" + req.body)
            const photoService = new PhotoService();
            console.log(req.body)
            await photoService.postPhoto(req.body);
            return res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err);
        }
    }

    async deletePhotoById(req, res, next) {
        console.log("function delete photo")
        try {
            const photoService = new PhotoService();
            await photoService.deletePhoto(req.params.id, "id");
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err)
        }
    }

    async updatePhotoById(req, res) {
        console.log("function update photo")
        try {
            const photoService = new PhotoService();
            await photoService.updatePhoto(req.body, req.params.id);
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
import { ItemService } from '../service/itemsService.js';
export default class PhotosController {


    // async getPhotos(req, res, next) {
    //     console.log("function get photos")
    //     try {
    //         const photoService = new ItemService("photo");
    //         const resultItems = await photoService.getItems(req)
    //         return res.status(200).json(resultItems)
    //     }
    //     catch (ex) {
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err)
    //     }
    // }

    async getPhotos(req, res, next) {
        console.log("function get photos with page");
        try {
            const photoService = new ItemService("photo");
            const resultItems = await photoService.getPhotosByPage(req);
            const hasmorePhotos=await photoService.getnumberOfphoto();
            let hasMore=true;
            console.log("😂    "+hasmorePhotos[0].count)
            hasmorePhotos[0].count%10==0?(hasmorePhotos[0].count/10==req.query.page&& (hasMore=false))
            :((parseInt(hasmorePhotos[0].count/10)+1)==req.query.page&& (hasMore=false))
            console.log("😂    "+(parseInt(hasmorePhotos[0].count/10)+1)+req.query.page)
            

            return res.status(200).json({data:resultItems,hasMore:hasMore})
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }



    async addPhoto(req, res) {
        console.log("function add photo")
        try {
            console.log("addPhoto"+req.body)
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
        console.log("function delete photo")
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
        console.log("function update photo")
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
import { ItemService } from '../service/itemsService.js';
export default class PostsController {

    async getPosts(req, res, next) {
        try {
            const postService = new ItemService("post");
            const resultItems = await postService.getAllItems()
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getPostById(req, res, next) {
        try {
              const postService = new ItemService("post");
            const resultItem = await postService.getItemByid(req.params.id);
            return res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }

    }

    async addPost(req, res) {
        try {
            const postService = new ItemService("post");
            console.log(req.body)
            await postService.postItem(req.body);

            return res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async deletePostById(req, res) {
        try {
            const postService = new ItemService("post");
            await postService.deleteItem(req.params.id);
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updatePostById(req, res) {
        try {
            const postService = new ItemService("post");
            await postService.updateItem(req.body,req.params.id);
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
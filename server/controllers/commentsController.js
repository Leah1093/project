import { ItemService } from '../service/itemsService.js';
export default class CommentsController {

    async getComments(req, res, next) {
        try {
            const commentService = new ItemService("comment");
            const resultItems = await commentService.getAllItems()
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getCommentById(req, res, next) {
        try {
              const commentService = new ItemService("comment");
            const resultItem = await commentService.getItemByid(req.params.id);
            return res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addComment(req, res) {
        try {
            const commentService = new ItemService("comment");
            console.log(req.body)
            await commentService.postItem(req.body);

            return res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async deleteCommentById(req, res) {
        try {
            const commentService = new ItemService("comment");
            await commentService.deleteItem(req.params.id);
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateCommentById(req, res) {
        try {
            const commentService = new ItemService("comment");
            await commentService.updateItem(req.body,req.params.id);
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
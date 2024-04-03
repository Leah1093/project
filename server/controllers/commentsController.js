import { ItemService } from '../service/itemsService.js';
export default class CommentsController {


    async getComments(req, res, next) {
        console.log("function get comments")
        try {
            const todoService = new ItemService("comment");
            const resultItems = await todoService.getItems(req)
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addComment(req, res) {
        console.log("function add comment")
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
        console.log("function delete comment")
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
        console.log("function update comment")
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
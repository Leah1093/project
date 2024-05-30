import { CommentService } from '../service/commentService.js';
export default class CommentsController {


    async getComments(req, res, next) {
        console.log("function get comments")
        try {
            const commentService = new CommentService();
            const resultComments = await commentService.getComments(req)
            return res.status(200).json(resultComments);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err);
        }
    }

    async addComment(req, res) {
        console.log("function add comment")
        try {
            const commentService = new CommentService();
            console.log(req.body)
            await commentService.postComment(req.body);

            return res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err);
        }
    }

    async deleteCommentById(req, res,next) {
        console.log("function delete comment")
        try {
            const commentService = new CommentService();
            await commentService.deleteComment(req.params.id,"id");
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err)
        }
    }

    async updateCommentById(req, res) {
        console.log("function update comment")
        try {
            const commentService = new CommentService();
            await commentService.updateComment(req.body,req.params.id);
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
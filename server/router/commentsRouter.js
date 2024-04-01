import express from "express";
import commentsController from '../controllers/commentsController.js'
const commentRouter = express.Router();

const commentController = new commentsController();

commentRouter.get("/:id",commentController.getCommentById)
commentRouter.get("/",commentController.getComments);
commentRouter.post("/",commentController.addComment);
commentRouter.delete("/:id",commentController.deleteCommentById);
commentRouter.put("/:id",commentController.updateCommentById);


export {
    commentRouter
}
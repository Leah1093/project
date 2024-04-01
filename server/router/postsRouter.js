import express from "express";
import postsController from '../controllers/postsController.js'
const postRouter = express.Router();

const postController = new postsController();

postRouter.get("/:id",postController.getPostById)
postRouter.get("/",postController.getPosts);
postRouter.post("/",postController.addPost);
postRouter.delete("/:id",postController.deletePostById);
postRouter.put("/:id",postController.updatePostById);


export {
    postRouter
}
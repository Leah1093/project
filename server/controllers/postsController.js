import { ItemService } from '../service/itemsService.js';
export default class PostsController {

    
    async getPosts(req, res, next) {
        console.log("function get posts")
        try {
            const todoService = new ItemService("post");
            const resultItems = await todoService.getItems(req)
            if (resultItems.length == 0)
            throw new Error("No elements found")
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            switch (err.message) {
                case "No elements found":
                    err.statusCode = 500;
                    break;
                default:
                    err.statusCode = 500;
                    break;
            }
            err.message = ex;
            next(err)
        }
    }

    async addPost(req, res) {
        console.log("function add post")
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
            // next(err);
        }
    }

    async deletePostById(req, res) {
        console.log("function delete post")
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
        console.log("function update post")
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
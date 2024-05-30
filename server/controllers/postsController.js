import { PostService } from '../service/postService.js';
export default class PostsController {


    async getPosts(req, res, next) {
        console.log("function get posts")
        try {
            const postService = new PostService();
            const resultPosts = await postService.getPosts(req)
            return res.status(200).json(resultPosts);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err);
        }
    }

    async addPost(req, res) {
        console.log("function add post")
        try {
            const postService = new PostService();
            console.log(req.body)
            await postService.postPost(req.body);

            return res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err);
        }
    }

    async deletePostById(req, res,next) {
        console.log("function delete post")
        try {
            const postService = new PostService();
            await postService.deletePost(req.params.id,"id");
            const commentService = new PostService("comment");
            await commentService.deletePost(req.params.id,"id");
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err)
        }
    }

    async updatePostById(req, res) {
        console.log("function update post")
        try {
            const postService = new PostService();
            await postService.updatePost(req.body, req.params.id);
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
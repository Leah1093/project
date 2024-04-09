import React from "react";
import { fetchPut } from "../fetch";
const UpdatePost = ({ post,index,setPosts,setAllPosts, setIsUpdate }) => {

    const update = (element) => {
        element.preventDefault()
        const newPost = { id: post.id, userId: post.userId, title: element.target[0].value, body: element.target[1].value }
        const updatePost = { title: element.target[0].value, body: element.target[1].value }
        setIsUpdate(-1)
        fetchPut(`post/${post.id}`, newPost, updatePost, setPosts, setAllPosts, updatePosts)
    }

    const updatePosts = (post, prev) => {
        const tempArrOfPosts = [
            ...prev.slice(0, index),
            post,
            ...prev.slice(index + 1)
        ];
        return tempArrOfPosts
    }

    return (
        <>
            <form onSubmit={update}>
                <label htmlFor="title">title:</label>
                <input id="title" type="text" defaultValue={post.title} /><br />
                <label htmlFor="body">body:</label>
                <textarea id="body" defaultValue={post.body} rows="10" cols="25" /><br />
                <input type="submit" value="update post" />
            </form>
        </>
    )
}
export default UpdatePost;
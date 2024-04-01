import React from "react";
const UpdatePost = ({ post, getPosts,setIsUpdate }) => {
    const updatePost = (element) => {
        element.preventDefault()

        fetch(`http://localhost:3000/posts/${post.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ title: element.target[0].value, body: element.target[1].value })
        }).then( response => {

            response.ok ?( getPosts() ,setIsUpdate(-1)) : alert("oops somthing went wrong... please try again!")
        });
    }
    return (
        <>
            <form onSubmit={updatePost}>
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
import React from "react";
const UpdatePost = ({ post,index,setPosts,setAllPosts, setIsUpdate }) => {

    const updatePost = (element) => {
        element.preventDefault()
        const newPost = { id: post.id, userId: post.userId, title: element.target[0].value, body: element.target[1].value }
        fetch(`http://localhost:8086/post/${post.id}`, {
            method: 'PUT',
            body: JSON.stringify({ title: element.target[0].value, body: element.target[1].value }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        }).then( response => {
            response.ok ?(setPosts((prev)=>updatePosts(newPost,prev)),setAllPosts((prev)=>updatePosts(newPost,prev)) ,setIsUpdate(-1)) : alert("oops somthing went wrong... please try again!")
        });
    }

    const updatePosts = (post, prev) => {
        const tempArrOfPosts = [
            ...prev.slice(0, index),
            post,
            ...prev.slice(index + 1)
        ];
        return tempArrOfPosts
    }

    // const UpdateTodo = ({ todo, index = { index }, setTodos, setAllTodos, setIsUpdate }) => 

    //     const updateTodo = (element) => {
    //         const newTodo = { id: todo.id, userId: todo.userId, title: element.target[1].value, completed: element.target[0].checked }
    //         element.preventDefault()
    //         fetch(`http://localhost:8086/todo/${todo.id}`, {
    //             method: 'PUT',
    //             body: JSON.stringify({ title: element.target[1].value, completed: element.target[0].checked }),
    //             headers: { 'Content-type': 'application/json; charset=UTF-8' }
    //         }).then(response => {
    //             response.ok ? (setTodos((prev)=>updateTodos(newTodo,prev)),setAllTodos((prev)=>updateTodos(newTodo,prev)), setIsUpdate(-1)) : alert("oops somthing went wrong... please try again!")
    //         });
    //     }
    
    //     const updateTodos = (todo, prev) => {
    //         const tempArrOfTodos = [
    //             ...prev.slice(0, index),
    //             todo,
    //             ...prev.slice(index + 1)
    //         ];
    //         return tempArrOfTodos
    //     }
    




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
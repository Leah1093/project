import React from "react";
import { fetchPut } from "../../fetch";

const UpdateComment = ({ comment, index, setComments, setAllComments, setIsUpdate }) => {

    const updateComment = (element) => {
        element.preventDefault()
        const newComment = { id: comment.id, postId: comment.postId, name: element.target[0].value, email: comment.email, body: element.target[1].value }
        const updateComment = { name: element.target[0].value, body: element.target[1].value }
        setIsUpdate(-1)
        fetchPut(`comment/${comment.id}`, newComment, updateComment, setComments, setComments, updateComments)
    }

    const updateComments = (comment, prev) => {
        const tempArrOfComments = [
            ...prev.slice(0, index),
            comment,
            ...prev.slice(index + 1)
        ];
        return tempArrOfComments
    }

    return (
        <>
            <form onSubmit={updateComment}>
                <label htmlFor="name">name:</label>
                <input id="name" type="text" defaultValue={comment.name} /><br />
                <label htmlFor="body">body:</label>
                <textarea id="body" defaultValue={comment.body} rows="10" cols="25" /><br />
                <input type="submit" value="update comment" />
            </form>
        </>
    )
}
export default UpdateComment;
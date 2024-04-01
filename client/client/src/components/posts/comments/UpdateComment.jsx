import React from "react";
const UpdateComment = ({setIsUpdate ,comment, getComments}) => {
    const updateComment = (element) => {
        element.preventDefault()

        fetch(`http://localhost:3000/comments/${comment.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ name: element.target[0].value, body: element.target[1].value })
        }).then( response => {
            response.ok ?( getComments() ,setIsUpdate(-1)) : alert("oops somthing went wrong... please try again!")
        });
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
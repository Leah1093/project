import React, { useEffect, useContext } from "react";
import { UserContext } from '../../../App'

const AddComment = ({ postId, setIsAdd, getComments }) => {
   const [currentUser, setCurrentUser] = useContext(UserContext);
   let commentId;

   const addNewComment = (element) => {
      element.preventDefault();
      const comment = {
         postId: postId,
         name: element.target[0].value,
         email: currentUser.email,
         body: element.target[1].value
      }

      fetch(`http://localhost:8086/comment`, {
         method: 'POST',
         body: JSON.stringify(comment),
         headers: { 'Content-type': 'application/json; charset=UTF-8' }
      }).then(response => {
         response.ok ? setIsAdd(false) : alert("oops somthing went wrong... please try again!")
      })
      getComments();
   }

   return (
      <>
         <h1>add</h1>
         <form onSubmit={addNewComment}>
            <input type="text" placeholder="name..." /><br />
            <textarea cols="25" rows="8" placeholder="body..." /><br />
            <input type="submit" value='add comment' /><br />
         </form>
      </>
   )
}


export default AddComment

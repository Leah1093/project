import React, { useEffect, useContext } from "react";
import { UserContext } from '../../../App'
import { fetchPost } from "../../fetch";
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
      fetchPost(`comment`, comment, getComments, setIsAdd)
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

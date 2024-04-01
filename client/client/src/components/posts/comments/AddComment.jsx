import React, { useEffect, useContext } from "react";
import { UserContext } from '../../../App'

const AddComment = ({ postId, setIsAdd, getComments }) => {
   const [currentUser, setCurrentUser] = useContext(UserContext);
   let commentId;
   useEffect(() => {
      fetch(`http://localhost:3000/nextIds/comments`)
         .then(async response => {
            const data = await response.json();
            if (response.ok) {
               commentId = data.nextId;
               fetch(`http://localhost:3000/nextIds/comments`, {
                  method: 'PATCH',
                  body: JSON.stringify({ nextId: data.nextId + 1 })
               });
            } else alert("oops somthng went wrong...");
         })
   }, [])



   const addNewComment = (element) => {
      element.preventDefault();
      const comment = {
         postId: postId,
         id: commentId.toString(),
         name: element.target[0].value,
         email: currentUser.email,
         body: element.target[1].value
      }

      fetch(`http://localhost:3000/comments`, {
         method: 'POST',
         body: JSON.stringify(comment)
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

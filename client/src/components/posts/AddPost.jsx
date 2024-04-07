import React, { useEffect, useContext } from "react";
import { UserContext } from '../../App'
import './posts.css'

const AddPost = ({ setIsAdd, getPosts }) => {
   const [currentUser, setCurrentUser] = useContext(UserContext);
   let id;
   const addNewPost = (element) => {
      element.preventDefault();
      const post = {
         userId: currentUser.userId,
         title: element.target[0].value,
         body:element.target[1].value
      }
      console.log(post);

      fetch(`http://localhost:8086/post`, {
         method: 'POST',
         body: JSON.stringify(post),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
      }).then(response => {
         response.ok ?(setIsAdd(false), getPosts()) : alert("oops somthing went wrong... please try again!")
      })
     
   }



   return (
      <div className="add-post">
         <h1 className="text-center">add</h1>
         <form onSubmit={addNewPost}>
            <input className="form-control" type="text" placeholder="title..." /><br />
            <input className="form-control" type="text" placeholder="body..." /><br />
            <input className="btn btn-primary" type="submit" value='add post' /><br />
         </form>
      </div>
   )
}


export default AddPost

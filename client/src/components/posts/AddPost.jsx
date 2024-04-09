import React, { useEffect, useContext } from "react";
import { UserContext } from '../../App'
import { fetchPost } from "../fetch.js";

import './posts.css'

const AddPost = ({ setIsAdd, getPosts }) => {
   
   const [currentUser, setCurrentUser] = useContext(UserContext);
   const addNewPost = (element) => {
      element.preventDefault();
      const post = {
         userId: currentUser.userId,
         title: element.target[0].value,
         body:element.target[1].value
      }
      fetchPost(`post`, post, getPosts, setIsAdd)
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

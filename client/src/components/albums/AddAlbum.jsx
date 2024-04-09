import React, { useEffect, useContext } from "react";
import { UserContext } from '../../App';
import { fetchPost } from "../fetch";
import './album.css'

const AddAlbum = ({ setIsAdd, getAlbums }) => {
   const [currentUser, setCurrentUser] = useContext(UserContext);
   let id;
   const addNewAlbum = (element) => {
      element.preventDefault();
      const album = {
         userId: currentUser.userId,
         title: element.target[0].value,
      }
      fetchPost(`album`, album, getAlbums, setIsAdd)     
   }



   return (
      <div className="add-album">
         <h1 className="text-center">add</h1>
         <form onSubmit={addNewAlbum}>
            <input className="form-control" type="text" placeholder="title..." /><br />
            <input className="btn btn-primary" type="submit" value='add album' /><br />
         </form>
      </div>
   )
}


export default AddAlbum

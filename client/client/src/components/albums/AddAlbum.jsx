import React, { useEffect, useContext } from "react";
import { UserContext } from '../../App'
import './album.css'

const AddAlbum = ({ setIsAdd, getAlbums }) => {
   const [currentUser, setCurrentUser] = useContext(UserContext);
   let id;
   const addNewAlbum = (element) => {
      element.preventDefault();
      const album = {
         userId: currentUser.userId,
         // id: id.toString(),
         title: element.target[0].value,
      }
      console.log(album);

      fetch(`http://localhost:8086/album`, {
         method: 'POST',
         body: JSON.stringify(album),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
      }).then(response => {
         response.ok ? setIsAdd(false) : alert("oops somthing went wrong... please try again!")
      })
      getAlbums();
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

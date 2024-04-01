import React, { useEffect, useContext } from "react";
import { UserContext } from '../../App'
import './album.css'

const AddAlbum = ({ setIsAdd, getAlbums }) => {
   const [currentUser, setCurrentUser] = useContext(UserContext);
   let id;
   useEffect(() => {
      fetch(`http://localhost:3000/nextIds/albums`)
         .then(async response => {
            const data = await response.json();
            if (response.ok) {
               id = data.nextId;
               fetch(`http://localhost:3000/nextIds/albums`, {
                  method: 'PATCH',
                  body: JSON.stringify({ nextId: data.nextId + 1 })
               });
            } else alert("oops.... something went wrong");
         })
   }, [])
   const addNewAlbum = (element) => {
      element.preventDefault();
      const album = {
         userId: currentUser.id,
         id: id.toString(),
         title: element.target[0].value,
      }
      console.log(album);

      fetch(`http://localhost:3000/albums`, {
         method: 'POST',
         body: JSON.stringify(album)
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

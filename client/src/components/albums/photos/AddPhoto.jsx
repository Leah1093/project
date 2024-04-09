import React, { useEffect } from "react";
const AddPhoto = ({ setItems,albumId, setIsAdd }) => {
   let id;
   const addNewPhoto = (element) => {
      element.preventDefault();
      const photo = {
         albumId: albumId, 
         title: element.target[0].value,
         url: element.target[1].value,
         thumbnailUrl: element.target[2].value
      }


      fetchPost(`photo`, photo, setItems, setIsAdd)

      // fetch(`http://localhost:8086/photo`, {
      //    method: 'POST',
      //    body: JSON.stringify(photo),
      //    headers: { 'Content-type': 'application/json; charset=UTF-8' }
      // }).then(response => {
      //    response.ok ? setIsAdd(false) : alert("oops somthing went wrong... please try again!")
      // })

      window.location.reload();//לבדוק אם יש אפשרות לשנות
   }



   return (
      <>
         <h1>add</h1>
         <form onSubmit={addNewPhoto}>
            <input type="text" placeholder="title..." /><br />
            <input type="url" placeholder="url..." /><br />
            <input type="url" placeholder="thumbnail url..." /><br />
            <input type="submit" value='add photo' /><br />
         </form>

      </>
   )
}


export default AddPhoto

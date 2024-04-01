import React, { useEffect } from "react";
const AddPhoto = ({ albumId, setIsAdd }) => {
   let id;
   useEffect(() => {
      fetch(`http://localhost:3000/nextIds/photos`)
         .then(async response => {
            const data = await response.json();
            if (response.ok) {
               id = data.nextId;
               fetch(`http://localhost:3000/nextIds/photos`, {
                  method: 'PATCH',
                  body: JSON.stringify({ nextId: data.nextId + 1 })
               });
            } else alert("oops somthng went wrong...");
         })
   }, [])
   const addNewPhoto = (element) => {
      element.preventDefault();
      const photo = {
         albumId: albumId,
         id: id.toString(),
         title: element.target[0].value,
         url: element.target[1].value,
         thumbnailUrl: element.target[2].value
      }
      console.log(photo);

      fetch(`http://localhost:3000/photos`, {
         method: 'POST',
         body: JSON.stringify(photo)
      }).then(response => {
         response.ok ? setIsAdd(false) : alert("oops somthing went wrong... please try again!")
      })

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

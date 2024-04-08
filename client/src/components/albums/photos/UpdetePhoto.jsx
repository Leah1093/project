import React from "react";

const UpdatePhoto = ({ photo,index,setPhotos,setItems, setIsUpdate }) => {
    const updatePhoto = (element) => {
        element.preventDefault()
        const newPhoto = { id: photo.id, albumId: photo.albumId,title: element.target[0].value, url: element.target[1].value, thumbnailUrl: element.target[2].value }

        fetch(`http://localhost:8086/photo/${photo.id}`, {
            method: 'PUT',
            body: JSON.stringify({ title: element.target[0].value, url: element.target[1].value, thumbnailUrl: element.target[2].value }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        }).then(response => {
            response.ok ? (setItems((prev)=>updatePhotos(newPhoto,prev)) , setIsUpdate(-1), window.location.reload()) : alert("oops somthing went wrong... please try again!")
        });
    }

    const updatePhotos = (photo, prev) => {
        const tempArrOfPhotos = [
            ...prev.slice(0, index),
           photo,
            ...prev.slice(index + 1)
        ];
        return tempArrOfPhotos
    }
    return (
        <>
            <form onSubmit={updatePhoto}>
                <label htmlFor="title">title:</label>
                <input id="title" type="text" defaultValue={photo.title} /><br />
                <label htmlFor="url">url:</label>
                <input type="url" id="url" defaultValue={photo.url} /><br />
                <label htmlFor="thumbnailUrl">thumbnail url:</label>
                <input type="url" id="thumbnailUrl" defaultValue={photo.thumbnailUrl} /><br />
                <input type="submit" value="update photo" />
            </form>
        </>
    )
}
export default UpdatePhoto;
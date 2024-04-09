import React from "react";
import { fetchPut } from "../../fetch";
const UpdatePhoto = ({ photo, index, setPhotos, setItems, setIsUpdate }) => {
    const updatePhoto = (element) => {
        element.preventDefault()
        const newPhoto = { id: photo.id, albumId: photo.albumId, title: element.target[0].value, url: element.target[1].value, thumbnailUrl: element.target[2].value }
        const updatePhoto = { title: element.target[0].value, url: element.target[1].value, thumbnailUrl: element.target[2].value }
        setIsUpdate(-1)
        fetchPut(`post/${post.id}`, newPhoto, updatePhoto, setItems, setItems, updatePhotos)
        //אולי צריך גם window.location.reload()
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
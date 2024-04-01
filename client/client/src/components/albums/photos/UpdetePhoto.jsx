import React from "react";
const UpdatePhoto = ({ setIsUpdate, photo, getPhotos }) => {
    const updatePhoto = (element) => {
        element.preventDefault()

        fetch(`http://localhost:3000/photos/${photo.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ title: element.target[0].value, url: element.target[1].value, thumbnailUrl: element.target[2].value })
        }).then(response => {
            response.ok ? (getPhotos(), setIsUpdate(-1) ,window.location.reload()) : alert("oops somthing went wrong... please try again!")
        });
    }
    return (
        <>
            <form onSubmit={updatePhoto}>
                <label htmlFor="title">title:</label>
                <input id="title" type="text" defaultValue={photo.title} /><br />
                <label htmlFor="url">url:</label>
                <input type="url" id="url" defaultValue={photo.url}/><br/>
                <label htmlFor="thumbnailUrl">thumbnail url:</label>
                <input type="url" id="thumbnailUrl" defaultValue={photo.thumbnailUrl}/><br/>
                <input type="submit" value="update photo" />
            </form>
        </>
    )
}
export default UpdatePhoto;
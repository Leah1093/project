
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';
import AddPhoto from "./AddPhoto";
import UpdatePhoto from "./UpdetePhoto";
import { MdDelete, MdModeEdit } from "react-icons/md";
import './photo.css'
const Photos = () => {

  const { albumId } = useParams();
  const [items, setItems] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(-1);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [first, setFirst] = useState(false);
  const location = useLocation()
  const album = location.state

  const getPhotos = () => {

    setTimeout(() => {
      fetch(`http://localhost:3000/photos?albumId=${albumId}&&_page=${page}`)
        .then(async response => {
          const data = await response.json();
          if (response.ok) {
            first ? setItems(prevItems => [...prevItems, ...(data.data)]) : setItems(data.data);
            setPage(data.next);
            setHasMore(data.next != null);
          }
        })
    }, 400);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getPhotos();
    setFirst(true)
  }, [])

  const remove = (id) => {
    fetch(`http://localhost:3000/photos/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        response.ok ? window.location.reload() : alert("oops somthing went wrong... please try again!");
      })
  }

  return (
    <>
      <h1>photos</h1>
      <h3> album:{album.id} {album.title}</h3>
      <button onClick={() => setIsAdd(!isAdd)}>add photo</button>
      {isAdd && <AddPhoto albumId={id} setIsAdd={setIsAdd} />}

      <InfiniteScroll
        loadMore={getPhotos}
        hasMore={hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        <div className="photo-container">
          {items.map((photo, index) => (
            <div className="photo-item">
              <span key={index} className="photo-item">
                <img src={photo.thumbnailUrl} />
                <button onClick={() => setIsUpdate(prevIsUpdate => prevIsUpdate === -1 ? index : -1)}><MdModeEdit /></button>
                <button disabled={isUpdate === index} onClick={() => remove(photo.id)}><MdDelete /></button>
                {isUpdate === index &&
                  <UpdatePhoto setIsUpdate={setIsUpdate} photo={photo} getPhotos={getPhotos} />}

              </span>
            </div>
          ))}
        </div>
        {console.log(items)}
      </InfiniteScroll>
    </>
  );
};

export default Photos;





import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';
import AddPhoto from "./AddPhoto";
import UpdatePhoto from "./UpdetePhoto";
import { MdDelete, MdModeEdit } from "react-icons/md";
import {fetchDelete } from "../../fetch";
import './photo.css'

const Photos = () => {
  const { albumId } = useParams();
  const [items, setItems] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(-1);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [first, setFirst] = useState(false);
  const [isData, setIsData] = useState(false);
  const location = useLocation()
  const album = location.state

  const getPhotos = () => {
    hasMore && fetch(`http://localhost:8086/photo?albumId=${parseInt(albumId)}&&page=${page}`)
      .then(async response => {
        const data = await response.json();
        data.data.length > 0 ? setIsData(true) : setIsData(false)
        if (response.ok) {
          (page != 1) ? setItems(prevItems => [...prevItems, ...(data.data)]) : (setItems(data.data));
          setPage(page + 1);
          setHasMore(data.hasMore);
        }
      })
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getPhotos();
    setFirst(true)
  }, [])

  const remove = (id,i) => {
    fetchDelete(`photo/${id}`, setItems, setItems, i)
  }

  return (
    <>
      <h1>photos</h1>
      <h3> album:{album.id} {album.title}</h3>
      <button onClick={() => setIsAdd(!isAdd)}>add photo</button>
      {isAdd && <AddPhoto setItems={setItems} albumId={album.id} setIsAdd={setIsAdd} />}
      <InfiniteScroll
        loadMore={getPhotos}
        hasMore={hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}>
        {isData ? <>
          <div className="photo-container">
            {items.map((photo, index) => (
              <div className="photo-item">
                <span key={index} className="photo-item">
                  <img src={photo.thumbnailUrl} />
                  <button onClick={() => setIsUpdate(prevIsUpdate => prevIsUpdate === -1 ? index : -1)}><MdModeEdit /></button>
                  <button disabled={isUpdate === index} onClick={() => remove(photo.id,index)}><MdDelete /></button>
                  {isUpdate === index &&
                    <UpdatePhoto setIsUpdate={setIsUpdate} photo={photo} getPhotos={getPhotos} setItems={setItems} />}
                </span>
              </div>
            ))}
          </div>
        </> : <p>no photos</p>}
      </InfiniteScroll>
    </>
  );
};

export default Photos;




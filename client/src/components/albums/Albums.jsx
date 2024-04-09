import React, { useState, useEffect, useContext } from "react";
import SearchAlbums from "./SearchAlbums";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import AddAlbum from "./AddAlbum";
import { Link } from "react-router-dom";
import { fetchGet } from "../fetch";
import { UserContext } from '../../App'

const Albums = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [exist, setExist] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [isData, setIsData] = useState(false);
  const [isAdd, setIsAdd] = useState(false)
  let [allAlbums, setAllAlbums] = useState([])
  const getAlbums = () => {
    fetchGet(`album?userId=${currentUser.userId}`, setAlbums, setAllAlbums, setIsData);
  }

  useEffect(() => {
    getAlbums()
  }, [currentUser])

  return (
    <>
      <h1 >Albums</h1>
      <button onClick={() => setIsAdd(!isAdd)}>add album</button>
      {isAdd && <AddAlbum setIsAdd={setIsAdd} getAlbums={getAlbums} />}
      {isData ? <>
        <div className="albums_container">
          <SearchAlbums setAlbums={setAlbums} allAlbums={allAlbums} albums={albums} />
          <div className="album-list" >
            {albums.map((album, index) => <>
              <div key={index} className="album album_item">
                <Link state={{ id: album.id, title: album.title }} to={`./${album.id}/photo`} >
                  <span>album: {album.id}</span>
                  <div className="album__content">
                    <span className="album__title"> {album.title}</span>
                  </div>
                </Link>
              </div>
            </>
            )}
          </div>
        </div></> : <p>no albums</p>}
    </>
  )
}
export default Albums
import React, { useState, useEffect, useContext } from "react";
import SearchAlbums from "./SearchAlbums";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import AddAlbum from "./AddAlbum";
import { Link } from "react-router-dom";
import { UserContext } from '../../App'

const Albums = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [exist, setExist] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [isAdd, setIsAdd] = useState(false)
  let [allAlbums, setAllAlbums] = useState([])
  const getAlbums = () => {
    fetch(`http://localhost:3000/albums?userId=${currentUser.id}`)
      .then(async response => {
        const data = await response.json();
        response.ok ? setExist(true) : setExist(false);
        setAlbums(data);
        setAllAlbums(data)
      })
  }

  useEffect(() => {
    getAlbums()
  }, [currentUser])

  return (
    <>
      <h1 >Albums</h1>
      <button onClick={() => setIsAdd(!isAdd)}>add album</button>
      {isAdd && <AddAlbum setIsAdd={setIsAdd} getAlbums={getAlbums} />}
      <div className="albums_container">
        <SearchAlbums setAlbums={setAlbums} allAlbums={allAlbums} albums={albums} />
        {!exist ? <AiOutlineLoading3Quarters /> :
          <div className="album-list" >
            {albums.map((album, index) => <>
              <div key={index} className="album album_item">
                <Link state={{ id: album.id, title: album.title }} to={`./${album.id}/photos`} >
                  <span>album: {album.id}</span>
                  <div className="album__content">
                    <span className="album__title"> {album.title}</span>
                  </div>
                </Link>
              </div>
            </>
            )}
          </div>}
      </div>
    </>
  )
}
export default Albums

import React, { useState, useEffect, useContext } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import SearchPosts from "./SearchPosts";
import { Link } from "react-router-dom";
import UpdatePost from "./UpdatePost";
import Style from '../loader.module.css'
import { UserContext } from '../../App'
import './posts.css'
const Posts = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [showBody, setShowBody] = useState(-1)
  let [allPosts, setAllPosts] = useState([])
  const [isUpdate, setIsUpdate] = useState(-1);
  const [loading, setLoading] = useState(true)
  const getPosts = () => {
    fetch(`http://localhost:3000/posts?userId=${currentUser.id}`)
      .then(async response => {
        const data = await response.json();
        response.ok ? (setPosts(data), setAllPosts(data)) : alert("oops somthing went wrong...")
      })
  }

  useEffect(() => {
    getPosts()
    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }, [currentUser])


  const remove = (id) => {

    fetch(`http://localhost:3000/posts/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        response.ok ? getPosts() : alert("oops somthing went wrong... please try again!");
      })
  }

  return (
    <>
      <h1>Posts</h1>
      <div className="posts_container">
        <SearchPosts setPosts={setPosts} allPosts={allPosts} posts={posts} />
        {loading ? <div className={Style.loader}>
          <div className={Style.circle}></div>
          <div className={Style.circle}></div>
          <div className={Style.circle}></div>
          <div className={Style.circle}></div>
        </div> : < >
          {posts.map((post, index) =>
            <div className="post_item" style={{ fontWeight: (showBody === index) && 'bold' }} key={index}>
              <span>ID: {post.id}</span>
              {(isUpdate != index) ? <>
                <span>TITLE: {post.title}</span>
              </> : <UpdatePost post={post} getPosts={getPosts} setIsUpdate={setIsUpdate} />}
              {showBody === index && <>
                <span>BODY: {post.body}</span>
                <button onClick={() => setIsUpdate(prevIsUpdate => prevIsUpdate === -1 ? index : -1)}><MdModeEdit /></button>
                <Link to={`./${post.id}/comments`}>comments</Link>
              </>
              }
              <button className="btmShowBody" onClick={() => setShowBody(prevShowBody => prevShowBody === index ? -1 : index)}> {showBody === index ? <FaEyeSlash /> : <FaEye />}</button>
              <button className="btnRemovePost" disabled={isUpdate === index} onClick={() => remove(post.id)}><MdDelete /></button>
            </div>
          )}</>}


      </div>
    </>
  )
}
export default Posts






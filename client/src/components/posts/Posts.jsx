
import React, { useState, useEffect, useContext } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import SearchPosts from "./SearchPosts";
import { Link } from "react-router-dom";
import UpdatePost from "./UpdatePost";
import Style from '../loader.module.css'
import { UserContext } from '../../App'
import { fetchGet, fetchDelete } from "../fetch";
import './posts.css'
import AddPost from "./AddPost";

const Posts = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [showBody, setShowBody] = useState(-1)
  const [isAdd, setIsAdd] = useState(false)
  const [allPosts, setAllPosts] = useState([])
  const [isData, setIsData] = useState(false);
  const [isUpdate, setIsUpdate] = useState(-1);
  const [loading, setLoading] = useState(true)
  const getPosts = () => {
    fetchGet(`post`, setPosts, setAllPosts, setIsData);
  }

  useEffect(() => {
    getPosts()
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [currentUser])

  const remove = (id, i) => {
    fetchDelete(`post/${id}`, setPosts, setAllPosts, i)
  }

  return (
    <>
      <h1>Posts</h1>
      <button onClick={() => setIsAdd(!isAdd)}>add post</button>
      {isAdd && <AddPost setIsAdd={setIsAdd} getPosts={getPosts} />}
      <div className="posts_container">
        {loading ? <div className={Style.loader}>
          <div className={Style.circle}></div>
          <div className={Style.circle}></div>
          <div className={Style.circle}></div>
          <div className={Style.circle}></div>
        </div> : < >
          {isData ? <>
            <SearchPosts setPosts={setPosts} allPosts={allPosts} posts={posts} />
            {posts.map((post, index) =>
              <div className="post_item" style={{ fontWeight: (showBody === index) && 'bold' }} key={index}>
                <span>ID: {post.id}</span>
                {(isUpdate != index) ? <>
                  <span>TITLE: {post.title}</span>
                </> : <UpdatePost setIsUpdate={setIsUpdate} index={index} post={post} setAllPosts={setAllPosts} setPosts={setPosts} />}
                {showBody === index && <>
                  <span>BODY: {post.body}</span>
                  {post.userId == currentUser.userId && <button onClick={() => setIsUpdate(prevIsUpdate => prevIsUpdate === -1 ? index : -1)}><MdModeEdit /></button>}
                  <Link to={`./${post.id}/comment`}>comments</Link>
                </>
                }
                <button className="btmShowBody" onClick={() => setShowBody(prevShowBody => prevShowBody === index ? -1 : index)}> {showBody === index ? <FaEyeSlash /> : <FaEye />}</button>
                {post.userId == currentUser.userId && <button className="btnRemovePost" disabled={isUpdate === index} onClick={() => remove(post.id, index)}><MdDelete /></button>}
              </div>
            )}
          </> : <p>no posts</p>}</>}


      </div>
    </>
  )
}
export default Posts






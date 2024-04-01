import React, { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import AddComment from "./AddComment";
import { MdDelete, MdModeEdit } from "react-icons/md";
import UpdateComment from "./UpdateComment";
import { UserContext } from '../../../App'
import './comments.css'
const Comments = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const { postId } = useParams();
    const [comments, setComments] = useState([]);
    const [isAdd, setIsAdd] = useState(false)
const[isUpdate,setIsUpdate]=useState(-1)

    const getComments = () => {
        debugger
        fetch(`http://localhost:3000/comments?postId=${postId}`)
        .then(async response => {
            const data = await response.json();
            response.ok ?  setComments(data) : alert("notExist")})
        }
   
    useEffect(() => {
        getComments()
    },  [currentUser])


    const remove = (commentId) => {
        fetch(`http://localhost:3000/comments/${commentId}`, {
          method: 'DELETE'
        })
          .then(response => {
            response.ok ? getComments() : alert("oops somthing went wrong... please try again!");
          })
      }
    return (
        <>

            <button onClick={() => setIsAdd(!isAdd)}>add comment</button>
            {isAdd && <AddComment postId={postId} setIsAdd={setIsAdd} getComments={getComments} />}
            <h3>comments for post id {postId}</h3>
            <div className="container">
            {comments.map((comment, index) => <div  className="bubble" key={index}>
                <p>postId: {comment.postId}</p>
                <p>id: {comment.id}</p>
                <p>email: {comment.email}</p>
                {isUpdate != index ?<>
                <p>name: {comment.name}</p>
                <p>body: {comment.body}</p>
                </>:<UpdateComment setIsUpdate={setIsUpdate} comment={comment} getComments={getComments}/>}
                <br />
                {currentUser.email===comment.email&&<>
                <button onClick={() => setIsUpdate(prevIsUpdate => prevIsUpdate === -1 ? index : -1)}><MdModeEdit /></button>
                <button disabled={isUpdate === index} onClick={() => remove(comment.id)}><MdDelete /></button>
                </>}
            </div>)}
            </div>

        </>
    )
}
export default Comments
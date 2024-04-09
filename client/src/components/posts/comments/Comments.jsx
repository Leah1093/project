import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AddComment from "./AddComment";
import { MdDelete, MdModeEdit } from "react-icons/md";
import UpdateComment from "./UpdateComment";
import { UserContext } from '../../../App';
import { fetchGet, fetchDelete } from "../../fetch";
import './comments.css'
const Comments = () => {
    
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const { postId } = useParams();
    const [comments, setComments] = useState([]);
    const [isData, setIsData] = useState(false);
    const [isAdd, setIsAdd] = useState(false)
    const [isUpdate, setIsUpdate] = useState(-1)

    const getComments = () => {
        fetchGet(`comment?postId=${postId}`, setComments, setComments, setIsData);
    }

    useEffect(() => {
        getComments()
    }, [currentUser])


    const remove = (commentId, i) => {
        fetchDelete(`comment/${commentId}`, setComments, setComments, i)
    }
    return (
        <>

            <button onClick={() => setIsAdd(!isAdd)}>add comment</button>
            {isAdd && <AddComment postId={postId} setIsAdd={setIsAdd} getComments={getComments} />}
            <h3>comments for post id {postId}</h3>
            {isData ? <>

                <div className="container">
                    {comments.map((comment, index) => <div className="bubble" key={index}>
                        <p>postId: {comment.postId}</p>
                        <p>id: {comment.id}</p>
                        <p>email: {comment.email}</p>
                        {isUpdate != index ? <>
                            <p>name: {comment.name}</p>
                            <p>body: {comment.body}</p>
                        </> : <UpdateComment setIsUpdate={setIsUpdate} comment={comment} index={index} setComments={setComments} />}
                        <br />
                        {currentUser.email === comment.email && <>
                            <button onClick={() => setIsUpdate(prevIsUpdate => prevIsUpdate === -1 ? index : -1)}><MdModeEdit /></button>
                            <button disabled={isUpdate === index} onClick={() => remove(comment.id, index)}><MdDelete /></button>
                        </>}
                    </div>)}
                </div></> : <p>no comments</p>}

        </>
    )
}
export default Comments
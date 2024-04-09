import React, { useEffect, useContext } from "react";
import { fetchPost } from "../fetch";
import { UserContext } from '../../App'

const AddTodo = ({ setIsAdd, getTodos }) => {

    const [currentUser, setCurrentUser] = useContext(UserContext);

    const addNewTodo = (element) => {
        element.preventDefault();
        const todo = {
            userId: currentUser.userId,
            title: element.target[0].value,
            completed: false
        }
        fetchPost(`todo`, todo, getTodos, setIsAdd)
    }

    return (
        <>
            <form onSubmit={addNewTodo} >
                <input type="text" placeholder="title..." /><br />
                <input type="submit" value='+' /><br />
            </form>
        </>
    )
}
export default AddTodo
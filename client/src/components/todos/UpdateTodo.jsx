import React from "react";
import { fetchPut } from "../fetch";

const UpdateTodo = ({ todo, index, setTodos, setAllTodos, setIsUpdate }) => {

    const updateTodo = (element) => {
        element.preventDefault()
        const newTodo = { id: todo.id, userId: todo.userId, title: element.target[1].value, completed: element.target[0].checked }
        const updateTodo = { title: element.target[1].value, completed: element.target[0].checked };  
        setIsUpdate(-1)
        fetchPut(`todo/${todo.id}`, newTodo, updateTodo, setTodos, setAllTodos, updateTodos)
    }

    const updateTodos = (todo, prev) => {
        const tempArrOfTodos = [
            ...prev.slice(0, index),
            todo,
            ...prev.slice(index + 1)
        ];
        return tempArrOfTodos
    }

    return (
        <>
            <form onSubmit={updateTodo}>
                <label>completed</label>
                <input type="checkbox" defaultChecked={todo.completed} />
                <label>title: </label>
                <input type="text" defaultValue={todo.title} />
                <input type="submit" value='update todo' />
            </form>
        </>
    )
}
export default UpdateTodo;
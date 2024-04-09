import React from "react";
import './todosStyle.css'
const Todo = ({ todo }) => {
    return (<>
        <span className="itemTodo id" >todo: {todo.id}</span>
        <span >{todo.title}</span>
        <input  className="checkbox" type="checkbox" disabled={true} checked={todo.completed} />
    </>)
}
export default Todo
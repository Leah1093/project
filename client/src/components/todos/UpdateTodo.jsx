import React from "react";
const UpdateTodo = ({ todo, index, setTodos, setAllTodos, setIsUpdate }) => {

    const updateTodo = (element) => {
        const newTodo = { id: todo.id, userId: todo.userId, title: element.target[1].value, completed: element.target[0].checked }
        element.preventDefault()
        fetch(`http://localhost:8086/todo/${todo.id}`, {
            method: 'PUT',
            body: JSON.stringify({ title: element.target[1].value, completed: element.target[0].checked }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        }).then(response => {
            response.ok ? (setTodos((prev)=>updateTodos(newTodo,prev)),setAllTodos((prev)=>updateTodos(newTodo,prev)), setIsUpdate(-1)) : alert("oops somthing went wrong... please try again!")
        });
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
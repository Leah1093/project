import React from "react";
const Fetch = (currentUser, setTodos, setAllTodos, setIsData) => {
    const f = () => {
        fetch(`http://localhost:8086/todo?userId=${currentUser.userId}`)
        .then(async response => {
            const data = await response.json();
            response.ok && (
                setTodos(data),
                setAllTodos(data));
            data.length > 0 ? setIsData(true) : setIsData(false)
        })
    }
    return (<>
        <h1>dsfvdgvd</h1>

    </>)

}
export default Fetch
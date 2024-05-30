
export const fetchGet = async (url, setItems, setAllItems, setIsData) => {
    try {
        const currntUser = JSON.parse(localStorage.getItem("currentUser"))
        const response = await fetch(`http://localhost:8080/${url}`, {
            headers: { Authorization: currntUser.token.token }
        });
        if (response.ok) {
            const data = await response.json();
            setItems(data);
            setAllItems(data);
            setIsData(data.length > 0);
        } else {
            console.error("Error fetching ");
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

export const fetchDelete = async (url, setItems, setAllItems, i) => {
    try {
        const currntUser = JSON.parse(localStorage.getItem("currentUser"))
        const response = await fetch(`http://localhost:8080/${url}`, {
            method: 'DELETE',
            headers: { Authorization: currntUser.token.token, 'Content-type': 'application/json; charset=UTF-8' }
        });
        if (response.ok) {
            setItems((prev => [...prev.slice(0, i), ...prev.slice(i + 1)]));
            setAllItems((prev => [...prev.slice(0, i), ...prev.slice(i + 1)]))
        } else {
            alert("oops something went wrong... please try again!");
        }
    } catch (error) {
        console.error("Error deleting ", error);
    }
};

export const fetchPost = async (url, item, getItems, setIsAdd) => {
    try {
        const currntUser = JSON.parse(localStorage.getItem("currentUser"))
        const response = await fetch(`http://localhost:8080/${url}`, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: { Authorization: currntUser.token.token, 'Content-type': 'application/json; charset=UTF-8' }
        });
        if (response.ok) {
            getItems();
            setIsAdd(false)
        } else {
            alert("oops something went wrong... please try again!");
        }
    } catch (error) {
        console.error("Error creating todo:", error);
    }
};

export const fetchPut = async (url, newItem, updatedItem, setItems, setAllItems, updateItems) => {
    try {
        const currntUser = JSON.parse(localStorage.getItem("currentUser"))
        const response = await fetch(`http://localhost:8080/${url}`, {
            method: 'PUT',
            body: JSON.stringify(updatedItem),
            headers: { Authorization: currntUser.token.token, 'Content-type': 'application/json; charset=UTF-8' }
        });
        if (response.ok) {
            setItems((prev) => updateItems(newItem, prev));
            setAllItems((prev) => updateItems(newItem, prev))
        } else {
            alert("oops something went wrong... please try again!");
        }
    } catch (error) {
        console.error("Error updating todo:", error);
    }
};

// export const fetchGet = async (url, setItems, setAllItems, setIsData) => {
//     const currntUser = JSON.parse(localStorage.getItem("currentUser"))
//     fetch(`http://localhost:8080/${url}`, {
//         headers: { Authorization: currntUser.token.token }
//     })
//         .then(async response => {
//             const data = await response.json();
//             (response.ok) ? (setItems(data), setAllItems(data), setIsData(data.length > 0)) :
//                 alert("oops somthing went wrong...")
//         })
// };

// export const fetchDelete = async (url, setItems, setAllItems, i) => {
//     const currntUser = JSON.parse(localStorage.getItem("currentUser"))
//     fetch(`http://localhost:8080/${url}`, {
//         method: 'DELETE',
//         headers: { Authorization: currntUser.token.token, 'Content-type': 'application/json; charset=UTF-8' }

//     }).then(response => {
//         (response.ok) ? (setItems((prev => [...prev.slice(0, i), ...prev.slice(i + 1)])),
//             setAllItems((prev => [...prev.slice(0, i), ...prev.slice(i + 1)]))) :
//             alert("oops something went wrong... please try again!");
//     })
// };

// export const fetchPost = async (url, item, getItems, setIsAdd) => {
//     const currntUser = JSON.parse(localStorage.getItem("currentUser"))
//     fetch(`http://localhost:8080/${url}`, {
//         method: 'POST',
//         body: JSON.stringify(item),
//         headers: { Authorization: currntUser.token.token, 'Content-type': 'application/json; charset=UTF-8' }


//     }).then(response => {
//         (response.ok) ? (getItems(), setIsAdd(false)) : alert("oops something went wrong... please try again!");
//     })
// };

// export const fetchPut = async (url, newItem, updatedItem, setItems, setAllItems, updateItems) => {
//     const currntUser = JSON.parse(localStorage.getItem("currentUser"))
//     fetch(`http://localhost:8080/${url}`, {
//         method: 'PUT',
//         body: JSON.stringify(updatedItem),
//         headers: { Authorization: currntUser.token.token, 'Content-type': 'application/json; charset=UTF-8' }

//     }).then(response => {
//         (response.ok) ? (setItems((prev) => updateItems(newItem, prev)), setAllItems((prev) => updateItems(newItem, prev))) :
//             alert("oops something went wrong... please try again!");
//     })
// };


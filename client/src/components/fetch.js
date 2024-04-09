export const fetchGet = async (url, setItems, setAllItems, setIsData) => {
    const currntUser = JSON.parse(localStorage.getItem("currentUser"))
    fetch(`http://localhost:8086/${url}`, {
        headers: { Authorization: currntUser.token.token }
    })
        .then(async response => {
            const data = await response.json();
            (response.ok) ? (setItems(data), setAllItems(data), setIsData(data.length > 0)) :
                alert("oops somthing went wrong...")
        })
};

export const fetchDelete = async (url, setItems, setAllItems, i) => {
    const currntUser = JSON.parse(localStorage.getItem("currentUser"))
    fetch(`http://localhost:8086/${url}`, {
        method: 'DELETE',
        headers: { Authorization: currntUser.token.token, 'Content-type': 'application/json; charset=UTF-8' }

    }).then(response => {
        (response.ok) ? (setItems((prev => [...prev.slice(0, i), ...prev.slice(i + 1)])),
            setAllItems((prev => [...prev.slice(0, i), ...prev.slice(i + 1)]))) :
            alert("oops something went wrong... please try again!");
    })
};

export const fetchPost = async (url, item, getItems, setIsAdd) => {
    const currntUser = JSON.parse(localStorage.getItem("currentUser"))
    fetch(`http://localhost:8086/${url}`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: { Authorization: currntUser.token.token, 'Content-type': 'application/json; charset=UTF-8' }


    }).then(response => {
        (response.ok) ? (getItems(), setIsAdd(false)) : alert("oops something went wrong... please try again!");
    })
};

export const fetchPut = async (url, newItem, updatedItem, setItems, setAllItems, updateItems) => {
    const currntUser = JSON.parse(localStorage.getItem("currentUser"))
    fetch(`http://localhost:8086/${url}`, {
        method: 'PUT',
        body: JSON.stringify(updatedItem),
        headers: { Authorization: currntUser.token.token, 'Content-type': 'application/json; charset=UTF-8' }

    }).then(response => {
        (response.ok) ? (setItems((prev) => updateItems(newItem, prev)), setAllItems((prev) => updateItems(newItem, prev))) :
            alert("oops something went wrong... please try again!");
    })
};


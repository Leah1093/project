
export const fetchGet = async (url, setItems, setAllItems, setIsData) => {
    try {
        const response = await fetch(`http://localhost:8086/${url}`);
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
        const response = await fetch(`http://localhost:8086/${url}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
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
        const response = await fetch(`http://localhost:8086/${url}`, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
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
    debugger
    try {
        const response = await fetch(`http://localhost:8086/${url}`, {
            method: 'PUT',
            body: JSON.stringify(updatedItem),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
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


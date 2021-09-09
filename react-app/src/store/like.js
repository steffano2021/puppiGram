

export const fetchAllLikes = (id) => async () => {
    const response = await fetch(`/api/likes/${id}`)
    const data = await response.json();
    if (response.ok){
        return data
    } else {
        return
    }
}


export const fetchLikeImage = (id, user_id) => async () => {
    const response = await fetch(`/api/likes/${id}`, {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({
        user_id
    })
    })

    const data = await response.json();
    if (response.ok){
        return data
    } else {
        return data
    }
}


export const fetchUndoLike = (id, user_id) => async () => {
    const response = await fetch(`/api/likes/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({
        user_id
    })
    })

    const data = await response.json();
    if (response.ok){
        return data
    } else {
        return data
    }
}


export const fetchDeleteAllLikes = (id) => async () => {
    const response = await fetch(`/api/likes/${id}`,{
        method: 'DELETE'
    })

    const data = await response.json();
    if (response.ok){
        return data
    } else {
        return data
    }
}

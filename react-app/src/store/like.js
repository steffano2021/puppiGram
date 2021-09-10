
const ALL_USER_LIKES = 'likes/ALL_USER_LIKES'

const allLikes = (likes) => ({
    type: ALL_USER_LIKES,
    payload: likes
})


// to display the amount of likes on an image
export const fetchAllImageLikes = (id) => async () => {
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

// ? dont seem to need it
// export const fetchDeleteAllLikes = (id) => async () => {
//     const response = await fetch(`/api/likes/${id}`,{
//         method: 'DELETE'
//     })

//     const data = await response.json();
//     if (response.ok){
//         return data
//     } else {
//         return data
//     }
// }

// adds the likes a user has made to the store
export const fetchAllPersonalLikes = (user_id) => async (dispatch) => {
    const response = await fetch(`/api/likes/all/${user_id}`)
    if (response.ok){
        const data = await response.json();
        dispatch(allLikes(data))
        return data
    } else {
        return
    }
}


let initialState = {};

export default function reducer(state = initialState, action){
    let newState;
    switch(action.type){
        case ALL_USER_LIKES:
            newState = {...action.payload}
            return newState;
        default:
            return state
    }
}

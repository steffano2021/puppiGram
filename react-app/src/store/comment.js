
const ALL_COMMENTS = 'comment/ALL_COMMENTS';
const ADD_COMMENT = 'comment/ADD_COMMENT';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';
const UPDATE_COMMENT = 'comment/UPDATE_COMMENT';


const allComments = (comments) => ({
    type: ALL_COMMENTS,
    payload: comments
})

const addComment = (comment) => ({
    type: ADD_COMMENT,
    payload: comment
})

const deleteComment = (id) => ({
    type: DELETE_COMMENT,
    payload: id
})

const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    payload: comment
})


export const fetchAllComments = () => async (dispatch) => {
    const response = await fetch('/api/comments/');
    if(response.ok){
        const data = await response.json();
        dispatch(allComments(data))
        return data
    } else {
        return;
    }
}

export const fetchCreateComment = (image_id, user_id, description) => async (dispatch) => {
    const response = await fetch('/api/comments/create', {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({
        image_id, user_id, description
    })
    })
    const data = await response.json();
    if (response.ok){
        dispatch(addComment(data))
        return data
    } else {
        return data
    }
}


let initialState = {};

export default function reducer(state = initialState, action){
    let newState;
    switch(action.type){
        case ALL_COMMENTS:
            newState = {...action.payload}
            return newState;

        case ADD_COMMENT:
            return newState;

        default:
            return state;
    }
}

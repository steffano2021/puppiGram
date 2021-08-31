import _ from 'lodash'

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

const deleteComment = (id, image_id) => ({
    type: DELETE_COMMENT,
    id,
    image_id,
})

const updateComment = (id, image_id, comment) => ({
    type: UPDATE_COMMENT,
    id,
    image_id,
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

export const fetchDeleteComment = (id,image_id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE'
    })

    if (response.ok){
        const data = await response.json();
        dispatch(deleteComment(id,image_id));
        return data
    }
}

export const fetchUpdateComment = (id, image_id, description) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({
        description
    })
    })

    const data = await response.json();
    if (response.ok){
        dispatch(updateComment(id,image_id, data))
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
            newState = {};
            let copy = {...action.payload}
            for (const key in copy){
                if(!newState[copy[key].image_id]){
                    newState[copy[key].image_id] = { [copy[key].id] : copy[key] }
                } else {
                    newState[copy[key].image_id] = { ...newState[copy[key].image_id], [copy[key].id] : copy[key] }
                }
            }
            return newState;
        case ADD_COMMENT:
            // console.log('inside reducer')
            // newState = {...state}
            // console.log(newState[1][1] === state[1][1],'testing with rest')
            newState = _.cloneDeep(state);
            // console.log(newState[1][1] === state[1][1],'testing with lodash')
            newState[action.payload.image_id] = {...newState[action.payload.image_id], [action.payload.id]: action.payload };
            return newState;

        case DELETE_COMMENT:
            newState = _.cloneDeep(state);
            delete newState[action.image_id][action.id];
            return newState;

        case UPDATE_COMMENT:
            newState = _.cloneDeep(state);
            newState[action.image_id][action.id] = {...action.payload};
            return newState;

        default:
            return state;
    }
}

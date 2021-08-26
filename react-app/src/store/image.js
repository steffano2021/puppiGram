
const ALL_IMAGES = 'image/ALL_IMAGES';
const ADD_IMAGE = 'image/ADD_IMAGE';
const DELETE_IMAGE = 'image/DELETE_IMAGE';
const UPDATE_IMAGE = 'image/UPDATE_IMAGE';


const allImages = (images) => ({
    type: ALL_IMAGES,
    payload: images
})

const addImage = (image) => ({
    type: ADD_IMAGE,
    payload: image
})

const deleteImage = (id) => ({
    type: DELETE_IMAGE,
    payload: id
})

const updateImage = (image) => ({
    type: UPDATE_IMAGE,
    payload: image
})


export const fetchAllImages = () => async (dispatch) => {
    const response = await fetch('/api/images');
    if (response.ok) {
        const data = await response.json();
        dispatch(allImages(data));
        return data
    }
    else {
        return;
    }
}


let initialState = {};

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
    case ALL_IMAGES:
        newState = {...action.payload}
        return newState
    case ADD_IMAGE:
        newState = {...state}
        newState[action.payload.id] = {...action.payload}
        return newState
    case DELETE_IMAGE:
        newState = {...state}
        delete newState[action.payload]
        return newState
    case UPDATE_IMAGE:
        newState = {...state}
        newState[action.payload.id] = {...action.payload}
        return newState
      default:
        return state;
    }
  }

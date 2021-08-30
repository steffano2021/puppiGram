
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
    const response = await fetch('/api/images/');
    if (response.ok) {
        const data = await response.json();
        dispatch(allImages(data));
        return data
    }
    else {
        return;
    }
}

export const fetchCreateImage = (user_id, image, caption) => async (dispatch) => {
    const form = new FormData();
    // repeat as necessary  for each required form field
    form.append('user_id', user_id);
    form.append('caption', caption);
    form.append('image', image);

    console.log('below is in the store')
    console.log(user_id, 'user_id')
    console.log(caption, 'caption')
    console.log(image, 'image')
    console.log(form, 'entire form')
    const response = await fetch('/api/images/create/', {
        method: "POST",
        body: form
    });

    const data = await response.json()
    if (response.ok){
        dispatch(addImage(data))
        return data
    } else {
        return data
    }
}

export const fetchEditImage = (user_id, image, caption, method, id) => async (dispatch) => {
    let response;
    if (method == 'PUT'){
        response = await fetch(`/api/images/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({
            caption
        })
    })

    } else { // this is for patch
        const form = new FormData();
        // repeat as necessary  for each required form field
        form.append('user_id', user_id);
        form.append('caption', caption);
        form.append('image', image);
        response = await fetch(`/api/images/${id}`, {
            method: "PATCH",
            body: form
        });
    }

    const data = await response.json()
    if (response.ok){
        dispatch(updateImage(data))
        return data
    } else {
        return data
    }
}




export const fetchDeleteImage = (id) => async (dispatch) => {
    const response= await fetch(`/api/images/${id}`, {
        method: "DELETE"
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteImage(id));
        return data
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

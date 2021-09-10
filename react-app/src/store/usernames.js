
// no longer used

const ALL_NAMES = 'user/ALL_USERS'

const allNames = (usernames) => ({
    type: ALL_NAMES,
    payload: usernames
})

export const fetchAllNames = () => async (dispatch) => {
    const response = await fetch('/api/users/');
    if (response.ok){
        const data = await response.json();
        dispatch(allNames(data));
        return data
    } else {
        return;
    }
}

let initialState = {};

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
    case ALL_NAMES:
        newState = {...action.payload}
        return newState
    default:
        return state
    }
}

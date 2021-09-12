
// only using the thunk to fetch a profile page

// const ALL_NAMES = 'user/ALL_USERS'

// const allNames = (usernames) => ({
//     type: ALL_NAMES,
//     payload: usernames
// })

export const fetchUserProfile = (id) => async () => {
    const response = await fetch(`/api/users/profile/${id}`);
    if (response.ok){
        const data = await response.json();
        return data
    } else {
        return;
    }
}

// let initialState = {};

// export default function reducer(state = initialState, action) {
//     let newState;
//     switch (action.type) {
//     case ALL_NAMES:
//         newState = {...action.payload}
//         return newState
//     default:
//         return state
//     }
// }

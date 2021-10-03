
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

export const fetchUpdateProfile = (id, avatar, username, email, bio, method) => async () => {
    let response;

    if(method == 'PUT'){
        response = await fetch(`/api/users/profile/edit/${id}`,{
            method: "PUT",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({
            username,
            email,
            bio,
        })
    })

    } else { // this is for patch, changing the avatar image
        const form = new FormData();
        // repeat as necessary  for each required form field
        form.append('avatar', avatar);
        form.append('username', username);
        form.append('email', email);
        form.append('bio', bio);

        response = await fetch(`/api/users/profile/edit/${id}`, {
            method: "PATCH",
            body: form
        });
    }

    const data = await response.json();
    if (response.ok){
        return data
    } else {
        return data;
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

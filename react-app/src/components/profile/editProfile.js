import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './editProfile.css'



const EditProfilePage = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    const [tempAvatar, setTempAvatar] = useState(user.avatar);
    const [newAvatar, setNewAvatar] = useState('');
    const [disableBtn, setDisableBtn] = useState(false);

    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [bio, setBio] = useState(user.bio)

    // hide the input type=file, and opens it by clicking a different button
    const changeAvatarInput = useRef()
    const openFileUploadWindow = () => {
        changeAvatarInput.current.click()
    }

    const changeAvatar = (e) => {
        console.log(e.target.files[0])

        // if user cancels, it wont cause an error
        if(!e.target.files.length) return

        if (e.target.files[0].type.includes("image/")){
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                setTempAvatar(reader.result)
            };
            setNewAvatar(e.target.files[0])
        }
    }

    const submitChanges = (e) => {
        e.preventDefault();
        // setDisableBtn(true);

        // no new avatar photo has been added so a put method will be sent
        if(!newAvatar){
            console.log('sending a put method')
            // const data = dispatch(username, email, bio)

        // new avatar was uploaded so sending over a patch method
        } else {
            console.log('sending a patch method')
            // const data = dispatch(newAvatar, username, email, bio)
        }
        console.log(user.avatar)
        console.log(newAvatar)
        console.log(username)
        console.log(email)
        console.log(bio)
    }

    return (
        <div className='edit-profile_page'>
            <div>
                <form className='edit-profile_container' onSubmit={submitChanges}>
                    <h3> Edit Profile </h3>
                    <div className='edit-profile-avatar'>
                        <img src={tempAvatar} alt='profile image' className='profile_avatar' />
                        <input type="file" onChange={changeAvatar} id="selectedFile" accept="image/*" style={{display: "none"}} ref={changeAvatarInput} />
                        <button type="button" onClick={openFileUploadWindow}> Browse.. </button>
                    </div>
                    <div className='edit-profile-form-div'>
                        <label className='edit-profile-label'>Username</label>
                        <input className='edit-profile-input' type='text' onChange={(e)=> setUsername(e.target.value)} value={username} ></input>
                    </div>
                    <div className='edit-profile-form-div'>
                        <label className='edit-profile-label'>Email</label>
                        <input className='edit-profile-input' type='text' onChange={(e)=>setEmail(e.target.value)} value={email} ></input>
                    </div>
                    <div className='edit-profile-form-div'>
                        <label className='edit-profile-label'>Bio</label>
                        <textarea className='edit-profile-textarea' type='text' onChange={(e)=>setBio(e.target.value)} placeholder='Please create a bio' value={bio}>
                        </textarea>
                    </div>
                    <div className='edit-profile-form-buttons'>
                        <button type='submit'>Submit</button>
                        <button type='button'>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfilePage;

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './editProfile.css'



const EditProfilePage = () => {

    const user = useSelector(state => state.session.user);

    const [tempAvatar, setTempAvatar] = useState(user.avatar);
    const [newAvatar, setNewAvatar] = useState('');
    const [disableBtn, setDisableBtn] = useState(false);

    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [bio, setBio] = useState(user.bio)


    const changeAvatar = (e) => {
        console.log(e.target.files[0])

        if (e.target.files.length){
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
        setDisableBtn(true);

    }

    return (
        <div className='edit-profile_page'>
            <div>
                <form className='edit-profile_container' onSubmit={submitChanges}>
                    <h3> Edit Profile </h3>
                    <div className='edit-profile-avatar'>
                        <img src={tempAvatar} alt='profile image' className='profile_avatar' />
                        <input type='file' onChange={changeAvatar} ></input>
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

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './editProfile.css'



const EditProfilePage = () => {

    const user = useSelector(state => state.session.user);

    const [tempAvatar, setTempAvatar] = useState(user.avatar);
    const [newAvatar, setNewAvatar] = useState('');
    const [disableBtn, setDisableBtn] = useState(false);


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
                <form className='edit-profile_container'>
                    <div className='edit-profile-avatar'>
                        <img src={tempAvatar} alt='profile image' className='profile_avatar' />
                        <input type='file' onChange={changeAvatar} placeholder='Chnage' ></input>
                    </div>
                    <div className='edit-profile-input'>
                        <label className='edit-profile-label'>Username</label>
                        <input type='text'></input>
                    </div>
                    <div className='edit-profile-input'>
                        <label className='edit-profile-label'>Email</label>
                        <input type='text'></input>
                    </div>
                    <div className='edit-profile-input'>
                        <label className='edit-profile-label'>Bio</label>
                        <textarea>
                        </textarea>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfilePage;

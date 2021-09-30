import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchUserProfile } from '../../store/userProfile';
import './profilePage.css'


const ProfilePage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    let { id } = useParams();

    const [profile, setProfile] = useState({});
    const [images, setImages] = useState([]);

    useEffect(() => {
        (async() => {
        let data = await dispatch(fetchUserProfile(id));
        setProfile(data)
        setImages(Object.values(data.images).reverse());
        window.scrollTo(0,0)
        })();

    }, [dispatch, id])

    return (
        <div className='profile_page'>
            <div className='profile-page_container'>
                <div className='profile_info'>
                    <div className='profile-info_left'>
                        <img className='profile_avatar' src={profile?.avatar} alt='avatar' />
                    </div>
                    <div className='profile-info_right'>
                        <div className='profile-right_top'>
                            <div>
                                {profile?.username}
                            </div>
                            <div>
                                <button type='button' onClick={() => {history.push('/profile/edit')}} >Edit Profile</button>
                            </div>
                        </div>
                        <div className='profile-right_middle'>
                            followers amount coming soon...
                        </div>
                        <div className='profile-right_bottom'>
                            {profile?.bio}
                        </div>
                    </div>
                </div>
                <div className='profile-separation-line'></div>
                <div className='profile-images_list' >
                    {images?.map(image => (
                        <img onClick={() => {history.push(`/images/details/${image.id}`)}} className='profile-posted_image' key={image.id} src={image.image} alt='img' />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;

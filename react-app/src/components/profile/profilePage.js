import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const ProfilePage = () => {

    const dispatch = useDispatch();

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        (async() => {
        setLoaded(true);
        })();

    }, [dispatch])

    if (!loaded) {
        return null;
    }

    return (
        <div className='profile_page'>
            <div className='profile-page_container'>
                <div className='profile_info'>
                    <div className='profile_left'>
                        <img src='' alt='' />
                    </div>
                    <div className='profile_right'>
                        <div>
                            name and edit btn
                        </div>
                        <div>
                            followers amount
                        </div>
                        <div>
                            bio stuff
                        </div>
                    </div>
                </div>
                <div className='profile-images_list' >
                    images...
                </div>

            </div>

        </div>
    )
}

export default ProfilePage;

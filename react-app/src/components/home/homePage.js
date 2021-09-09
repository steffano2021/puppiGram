import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './homePage.css'

import { fetchAllPersonalLikes } from '../../store/like';

import HomePageImage from './homePageImage';

function HomePage() {

    const dispatch = useDispatch();

    const user_id = useSelector(state => state.session.user?.id);
    const images = Object.values( useSelector(state => state.image));

    useEffect(() => {
        (async() => {
            await dispatch(fetchAllPersonalLikes(user_id));
          })();
    }, [dispatch])

    return (
        <div className='homePage_container'>
            <div className='homePage_title'>
                <h1><i className="fas fa-paw"></i> puppiGram <i className="fas fa-paw"></i></h1>
            </div>
            <div className='imagesList_container'>
            {images.map(image => (
                <HomePageImage key={image.id} image={image} />
            ))}
            </div>
        </div>
    )
}

export default HomePage;

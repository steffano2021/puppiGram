import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './homePage.css'

import { fetchAllPersonalLikes } from '../../store/like';

import HomePageImage from './homePageImage';

function HomePage() {

    const dispatch = useDispatch();

    const user_id = useSelector(state => state.session.user?.id);
    const images = Object.values( useSelector(state => state.image));
    const likes = useSelector(state => state.like)

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async() => {
            await dispatch(fetchAllPersonalLikes(user_id));
            setLoaded(true)
          })();
    }, [dispatch])

    return (
        <div className='homePage_container'>
            <div className='homePage_title'>
                <h1><i className="fas fa-paw"></i> puppiGram <i className="fas fa-paw"></i></h1>
            </div>
            <div className='imagesList_container'>
            { loaded ? images.map(image => (
                <HomePageImage key={image.id} image={image} clicked={likes[image.id]} />
            )): null}
            </div>
        </div>
    )
}

export default HomePage;

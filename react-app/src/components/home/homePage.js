import React, { } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './homePage.css'

import HomePageImage from './homePageImage';

function HomePage() {

    const user = useSelector(state => state.session.user);
    const images = Object.values( useSelector(state => state.image));

    return (
        <div className='homePage_container'>
            <div className='homePage_title'>
                <h1><i className="fas fa-paw"></i> puppiGram <i className="fas fa-paw"></i></h1>
            </div>
            <div className='imagesList_container'>
            {images.map(image => (
                <HomePageImage image={image} />
            ))}
            </div>
        </div>
    )
}

export default HomePage;

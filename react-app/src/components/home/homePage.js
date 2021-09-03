import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './homePage.css'


function HomePage() {

    const user = useSelector(state => state.session.user);
    const images = Object.values( useSelector(state => state.image) );

    return (
        <div className='homePage_container'>
            <div>
                <h1>PuPPIgram</h1>
            </div>
            <div className='imagesList_container'>
            {images.map(image => (
                <div key={image.id} className='image_container'>
                <NavLink to={`/images/details/${image.id}`} >
                    <img className='image_image' src={image.image} alt={image.id} />
                    <div className='image_caption'>
                    <p>{image.caption}</p>
                    <p>{image.created_at}</p>
                    </div>
                </NavLink>
                </div>
            ))}
            </div>
        </div>
    )
}

export default HomePage;

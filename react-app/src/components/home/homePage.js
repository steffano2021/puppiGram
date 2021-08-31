import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './homePage.css'


function HomePage() {

    const user = useSelector(state => state.session.user);
    const images = Object.values( useSelector(state => state.image) );
    // console.log(images)

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
                    {/* {image.id} */}
                    {image.caption}
                    {image.created_at}
                    </div>
                </NavLink>
                </div>
            ))}
            </div>
        </div>
    )
}

export default HomePage;

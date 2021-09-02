import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import './splash.css'


const SplashPage = () => {

    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const images = Object.values( useSelector(state => state.image));
    const three_images = images.slice(images.length-3);

    if (user) {
        return <Redirect to='/home' />;
    }

    const openSignup = () => {
        history.push('/signup')
    }

    return (
        <div className='splash_page'>
            <div className='splash-page_container'>
                <div className='splash-page_header'>Look what our users are posting!</div>
                <div className='splash-images_container'>
                    {three_images.map(image => (
                        <div key={image.id} className='splash-image_container'>
                        <img className='splash_image' src={image.image} alt={image.id} />
                        <div className='splash_caption'>
                        <p>{image.caption}</p>
                        <p>{image.created_at}</p>
                        </div>
                    </div>
                    ))}
                </div>
                <div className='splash-page-info_column'>WHO WE ARE:
                    <p>This is a small community of dog lovers from all around. We all share one purpose, to share our love for dogs through photos we capture.</p>
                    <p>If this sounds like you, then go ahead and sign up today!</p>
                </div>
                <div className='splash-page_join'>
                    JOIN
                    <button onClick={openSignup}>Today!</button>
                </div>
            </div>
        </div>
    )
};

export default SplashPage;

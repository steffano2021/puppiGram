import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import './splash.css'


const SplashPage = () => {

    const user = useSelector(state => state.session.user);


    if (user) {
        return <Redirect to='/home' />;
    }

    return (
        <div>
            <h1>SPLASH PAGE</h1>
        </div>
    )
};

export default SplashPage;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function HomePageImage({image}){

    const dispatch = useDispatch();

    const [liked, setLiked] = useState(false)

    const likePhoto = () => {
        setLiked(!liked)
        if (!liked){
            // dispatch() send to a createLike thunk
        } else {
            // dispatch() send to a deleteLike thunk
        }

    }

    return (
        <div className='image_container'>
        <NavLink to={`/images/details/${image.id}`} >
            <img className='image_image' src={image.image} alt={image.id} />
            <div className='image_caption'>
                <p>{image.caption}</p>
                <p>{image.created_at.slice(4,16)}</p>
            </div>
        </NavLink>
                <div onClick={likePhoto} > {liked ? 'filled star' : 'star'} </div>
        </div>
    )
}

export default HomePageImage;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLikeImage, fetchUndoLike } from '../../store/like'
import './homePageImage.css'


function HomePageImage({image, clicked}){
    const dispatch = useDispatch();

    const user_id = useSelector(state => state.session.user?.id);
    // id is image_id here
    const id = image.id;

    const [liked, setLiked] = useState(clicked);

    const likePhoto = async() => {
        if (!user_id) return

        if (!liked){
            await dispatch(fetchLikeImage(id, user_id))
            // creates a like
        } else {
            await dispatch(fetchUndoLike(id,user_id))
            // deletes a like
        }
        setLiked(!liked)
    }

    return (
        <div className='image_container'>
            <div className='image-username_container' >
                <div className='image_avatar_container' >
                    <img className='image_avatar' src={image.image} alt={image.id} />
                </div>
                <div className='image_username' > {image.username}</div>
            </div>
            <NavLink to={`/images/details/${image.id}`} >
                <img className='image_image' src={image.image} alt={image.id} />
            </NavLink>
            <div className='image_bottom'>
                <div className='image_icons' >
                    <div onClick={likePhoto} >
                        {liked ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
                    </div>
                    <NavLink to={`/images/details/${image.id}`} >
                        <i className="far fa-comment"></i>
                    </NavLink>
                </div>
                <div className='image_caption'>
                    <div className='image_username' > {image.username}</div> {image.caption}
                </div>
                <div className='image_date' >
                    {image.created_at.slice(4,16)}
                </div>
            </div>
        </div>
    )
}

export default HomePageImage;

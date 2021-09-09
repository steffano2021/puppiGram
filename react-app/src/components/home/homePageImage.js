import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLikeImage, fetchUndoLike, fetchAllLikes } from '../../store/like'


function HomePageImage({image}){
    const dispatch = useDispatch();

    const user_id = useSelector(state => state.session.user?.id);
    // id is image_id here
    const id = image.id;

    const [liked, setLiked] = useState(false);

    const likePhoto = async() => {
        if (!liked){
            await dispatch(fetchLikeImage(id, user_id))
            // dispatch() send to a createLike thunk
        } else {
            await dispatch(fetchUndoLike(id,user_id))
            // dispatch() send to a deleteLike thunk
        }
        setLiked(!liked)
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
                <div onClick={likePhoto} > {liked ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>} </div>
        </div>
    )
}

export default HomePageImage;

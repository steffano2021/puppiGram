import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory, useParams } from 'react-router-dom';

import { fetchDeleteComment } from '../../store/comment';



const CommentComponent = ({comment, image_id}) => {

    const dispatch = useDispatch();

    const deleteComment = () => {
        dispatch(fetchDeleteComment(comment.id,image_id))
    }

    const updateComment = () => {

    }

    return (
        <div className='comment_container'>
            <div className='comment_to-center'>
            <div>{comment.user_id} this is the user's id</div>
            <div>{comment.description}</div>
            <div>{comment.created_at}</div>
            </div>
            <div>
                <button onClick={deleteComment}>delete</button>
                <button onClick={updateComment}>update</button>
            </div>
        </div>
    )
}

export default CommentComponent

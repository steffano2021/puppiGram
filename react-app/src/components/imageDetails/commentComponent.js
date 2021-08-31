import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';



const CommentComponent = ({comment}) => {



    return (
        <div className='comment_container'>
            <div className='comment_to-center'>
            <div>{comment.user_id} this is the user's id</div>
            <div>{comment.description}</div>
            <div>{comment.created_at}</div>
            </div>
        </div>
    )
}

export default CommentComponent

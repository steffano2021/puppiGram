import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory, useParams } from 'react-router-dom';

import { fetchDeleteComment, fetchUpdateComment } from '../../store/comment';



const CommentComponent = ({comment, image_id}) => {

    const dispatch = useDispatch();

    const user_id = useSelector(state => state.session.user?.id);

    const [description, setDescription] = useState(comment.description);
    const [errors, setErrors] = useState([]);
    const [editMode, setEditMode] = useState(false);

    const deleteComment = () => {
        dispatch(fetchDeleteComment(comment.id,image_id));
    }

    const updateComment = async() => {
        const data = await dispatch(fetchUpdateComment(comment.id,image_id,description));
        if (data.errors){
            setErrors(data.errors)
            console.log(errors)
            return
        } else {
            setEditMode(false)
        }
    }

    return (
        <div className='comment_container'>
            <div className='comment_to-center'>
            <div>{comment.user_id} this is the user's id</div>
            {!editMode ?
            <div>{comment.description}</div>
            :<div>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
            </div>}
            <div>{comment.created_at}</div>
            </div>
            <div>
            {!editMode ? <>
                <button onClick={()=>setEditMode(true)}>edit</button>
                <button onClick={deleteComment}>delete</button>
                </>
            :<>
                <button onClick={updateComment}>update</button>
                <button onClick={()=>setEditMode(false)}>cancel</button>
            </>
            }
            </div>
        </div>
    )
}

export default CommentComponent

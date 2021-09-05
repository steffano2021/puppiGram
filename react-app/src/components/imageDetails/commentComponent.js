import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeleteComment, fetchUpdateComment } from '../../store/comment';
import './commentComp.css'


const CommentComponent = ({comment, image_id}) => {

    const dispatch = useDispatch();

    const user_id = useSelector(state => state.session.user?.id);
    const names = useSelector(state => state.usernames);

    const [description, setDescription] = useState(comment.description);
    const [errors, setErrors] = useState([]);
    const [editMode, setEditMode] = useState(false);

    const deleteComment = () => {
        if (user_id != comment.user_id) return
        dispatch(fetchDeleteComment(comment.id,image_id));
    }

    const updateComment = async() => {
        if (user_id != comment.user_id) return
        const data = await dispatch(fetchUpdateComment(comment.id,image_id,description));
        if (data.errors){
            setErrors(data.errors)
            return
        } else {
            setEditMode(false)
        }
    }

    const closeWindow = () => {
        setEditMode(false);
        setDescription(comment.description);
        setErrors([]);
    }

    return (
        <div className='comment_container'>
                <div className='comment_top'>
                    {names[comment.user_id].username}
                </div>
                {!editMode ?
                <div className='comment_middle'>
                    {comment.description}
                </div>
                :<div className='comment_middle'>
                    <textarea maxLength='100' className='comment-middle_textarea' value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                </div>}
                <div className='comment_bottom'>
                    <div className='comment_date'>{comment.created_at.slice(4,16)}</div>
                    <div className='comment_error' >{errors?.description}</div>
                {user_id == comment.user_id ?
                <div className='comment-bottom_buttons'>
                {!editMode ? <>
                    <button onClick={()=>setEditMode(true)}><i className="far fa-edit"></i></button>
                    <button onClick={deleteComment}><i className="far fa-trash-alt"></i></button>
                    </>
                :<>
                    <button onClick={updateComment}><i className="far fa-paper-plane"></i></button>
                    <button onClick={closeWindow}><i className="far fa-window-close"></i></button>
                </>
                }
                </div>
                : null}
                </div>
            </div>
    )
}

export default CommentComponent

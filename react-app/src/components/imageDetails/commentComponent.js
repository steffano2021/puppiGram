import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeleteComment, fetchUpdateComment } from '../../store/comment';
import './commentComp.css'


const CommentComponent = ({comment, image_id}) => {

    const dispatch = useDispatch();

    const user_id = useSelector(state => state.session.user?.id);

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
            console.log(errors)
            return
        } else {
            setEditMode(false)
        }
    }

    return (
        <div className='comment_container'>
                <div>
                    {comment.user_id} this is the user's id
                </div>
                {!editMode ?
                <div>
                    {comment.description}
                </div>
                :<div>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                </div>}
                <div>
                    <div>{comment.created_at}</div>
                {user_id == comment.user_id ?
                <div>
                {!editMode ? <>
                    <button onClick={()=>setEditMode(true)}><i class="far fa-edit"></i></button>
                    <button onClick={deleteComment}><i class="far fa-trash-alt"></i></button>
                    </>
                :<>
                    <button onClick={updateComment}>update</button>
                    <button onClick={()=>setEditMode(false)}>cancel</button>
                </>
                }
                </div>
                : null}
                </div>
            </div>
    )
}

export default CommentComponent

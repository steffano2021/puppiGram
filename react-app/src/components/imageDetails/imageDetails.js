import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDeleteImage } from '../../store/image';
import { fetchCreateComment } from '../../store/comment';
import './imageDetails.css'

import CommentComponent from './commentComponent';

const ImageDetailsPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    let { id } = useParams(); //this the image id


    const thisImg = useSelector(state => state.image[id]);
    const user_id = useSelector(state => state.session.user?.id);
    const commentsObj = useSelector(state => state.comment[id]);
    const names = useSelector(state => state.usernames);
    const image_id = id;

    let comments = [];
    // console.log(commentsObj, 'commentsObj')
    if(commentsObj){
        comments = Object?.values(commentsObj)
    }

    const [errors, setErrors] = useState([]);
    const [description, setDescription] = useState('')

    const postComment = async(e) => {
        e.preventDefault()
        const data = await dispatch(fetchCreateComment(image_id, user_id, description))
        if (data.errors){
            setErrors(data.errors)
            return
        } else {
            setDescription('')
        }
    }

    const deleteImg = () => {
        if(user_id != thisImg.user_id) return
        dispatch(fetchDeleteImage(image_id))
        history.push('/home')
    }

    const clearTextArea = () => {
        setDescription('')
    }

    return (
        <div className='imageDetails_page'>
            <div className='details_container'>
                <div className='image-column'>
                    <div>
                        <img className='image-column_image' src={thisImg.image} alt='user-image' />
                    </div>
                    <div className='image-column_qty-btn' >
                        <div>0 likes and {comments?.length} comments</div>
                        {user_id == thisImg.user_id ?
                        <div className='image-column_buttons'>
                            <button onClick={()=> history.push(`/images/edit/${id}`)} ><i className="far fa-edit"></i></button>
                            <button onClick={deleteImg} ><i className="far fa-trash-alt"></i></button>
                        </div> : null}
                    </div>
                    <div className='image-column_comment' >
                        <div className='image-column_comment-list'>
                            {comments?.map(comment => (
                                <CommentComponent key={comment.id} comment={comment} image_id={image_id} />
                            ))}
                        </div>
                        <div>
                            <form className='image-column_form' onSubmit={postComment}>
                            <textarea className='image-column_textarea' placeholder='Enter a comment' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            <div className='image-column_form-btns'>
                            <button type='submit'><i class="far fa-paper-plane"></i></button>
                            <button type='reset' onClick={clearTextArea} ><i class="fas fa-eraser"></i></button>
                            </div>
                            </form>
                            <div className='image-column_error' >{errors?.description}</div>
                        </div>
                    </div>
                </div>
                <div className='profile-column'>
                    <div>
                        <div></div>
                        <div className='profile-column_username'>{names[thisImg.user_id].username}'s photo</div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )

}

export default ImageDetailsPage

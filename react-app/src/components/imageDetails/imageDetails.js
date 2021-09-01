import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
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
    const image_id = id;

    let comments
    // console.log(commentsObj, 'commentsObj')
    if(commentsObj){
        comments = Object?.values(commentsObj)
    }

    const [errors, setErrors] = useState([]);
    const [description, setDescription] = useState('')

    const postComment = async(e) => {
        e.preventDefault()
        console.log(description, 'the comment')
        console.log(user_id, 'user_id')
        console.log(image_id, 'image_id')
        const data = await dispatch(fetchCreateComment(image_id, user_id, description))
        if (data.errors){
            console.log(data)
            setErrors(data.errors)
            console.log(errors, 'errors')
            return
        } else {
            // history.push('/home')
            setDescription('')
        }
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
                    {user_id == thisImg.user_id ?
                    <div className='image-column_buttons'>
                        <button onClick={()=> history.push(`/images/edit/${id}`)} >edit</button>
                        <button  >delete</button>
                    </div>
                    : null}
                    <div className='image-column_quantity' >
                        <div>likes and {comments.length} comments</div>
                    </div>
                    <div>
                        <div className='image-column_comments'>
                            {comments?.map(comment => (
                                <CommentComponent key={comment.id} comment={comment} image_id={image_id} />
                            ))}
                        </div>
                        <div>
                            <form onSubmit={postComment}>
                            <textarea placeholder='Enter a comment' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            <button type='submit'>post</button>
                            <button type='reset' onClick={clearTextArea} >clear</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='profile-column'>
                    <div>
                        <div>avatar image</div>
                        <div>username</div>
                    </div>
                    <div>bio</div>
                </div>
            </div>
        </div>
    )

}

export default ImageDetailsPage

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
// import { fetchCreateImage } from '../../store/image';
import './imageDetails.css'


const ImageDetailsPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    let { id } = useParams();


    const thisImg = useSelector(state => state.image[id]);
    const user_id = useSelector(state => state.session.user?.id);

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
                        <div>likes and comments amount</div>
                    </div>
                    <div>
                        <div className='image-column_comments'>
                            comments component goes here
                        </div>
                        <div>
                            <form>
                            <input type='text' ></input>
                            <button type='reset'>clear</button>
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

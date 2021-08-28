import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDeleteImage, fetchEditImage } from '../../store/image';
// import './postImage.css'

const EditImageForm = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    let { id } = useParams();

    const thisImg = useSelector(state => state.image[id]);
    const user_id = useSelector(state => state.session.user?.id);

    // const url = new URL(thisImg.image);
    // const photoUrl = url.toString();  // return the URL as a string

    const [errors, setErrors] = useState([]);
    const [image, setImage] = useState(thisImg.image);
    const [caption, setCaption] = useState(thisImg.caption);

    const imageInput = useRef();
    const dropZone = useRef();
    const p1 = useRef();
    const p2 = useRef();

    const openInput = () => {
        imageInput.current.click()
    }

    const dragOver = (e) => {
        e.preventDefault();
        dropZone.current.classList.add('in-dropzone')
    }

    const exitDrag = (e) => {
        e.preventDefault();
        dropZone.current.classList.remove('in-dropzone')
    }

    const displayImage = (e) => {       //this is for dropping an image
        e.preventDefault();
        resetAll()

        if (e.dataTransfer.files[0].type.includes("image/")){
            let file = e.dataTransfer.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                dropZone.current.style.backgroundImage = `url('${reader.result}')`;
            };
            imageInput.current.files = e.dataTransfer.files;
            p1.current.classList.add('disappear')
            p2.current.classList.add('disappear')
        }
        dropZone.current.classList.remove('in-dropzone')
    }

    const showImage = (e) => {   // this is for entering an image by clicking the box
        resetAll()

        if (e.target.files.length){
            let file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                dropZone.current.style.backgroundImage = `url('${reader.result}')`;
            };
            imageInput.current.files = e.target.files;
            p1.current.classList.add('disappear')
            p2.current.classList.add('disappear')
        }
        dropZone.current.classList.remove('in-dropzone')
    }

    const resetAll = () => {
        dropZone.current.style.backgroundImage = null;
        p1.current.classList.remove('disappear')
        p2.current.classList.remove('disappear')
        setErrors([])
    }

    // wont work right with async, removed async
    const deleteImg = () => {
        dispatch(fetchDeleteImage(thisImg.id))
        history.push('/home')
    }

    const submitImage = async (e) => {
        e.preventDefault();
        console.log(image, 'this the image useState')
        console.log(caption, 'this the caption useState')
        console.log(thisImg.image, 'this the og image')

        let data;
        if (!image){
            console.log('send put method')
            data = await dispatch(fetchEditImage (user_id, image, caption, 'PUT', thisImg.id ))
        } else {
            console.log('send patch method')
            data = await dispatch(fetchEditImage (user_id, image, caption,'PATCH', thisImg.id ))
        }

        if (data.errors){
            setErrors(data.errors)
            console.log(errors)
            return
        } else {
            history.push('/home')
        }
    }

    useEffect(() => {
        dropZone.current.style.backgroundImage = `url('${thisImg.image}')`;
        p1.current.classList.add('disappear');
        p2.current.classList.add('disappear');
    }, [])

    return (
        <div className='postImage-page'>
        <div className='imagePost_container'>
        <form onSubmit={submitImage} encType='multipart/form-data'>
            <div className='dropzone' ref={dropZone} onClick={openInput}
             onDragOver={dragOver} onDragLeave={exitDrag} onDragEnd={exitDrag}
             onDrop={displayImage} >
                <span className='p-tag' ref={p1} >Drag and Drop</span>
                <span className='p-tag' ref={p2} >or click to submit a file</span>
                <input onChange={showImage} ref={imageInput} type='file' className='dropzone_input' ></input>
            </div>
            <div className='imagePost-caption'>
            <span>{errors?.image}</span>
            <textarea value={caption} type='text' placeholder='OPTIONAL: Write a caption...' onChange={(e) => {setCaption(e.target.value)}} cols='10' rows='5' ></textarea>
            </div>
            <div className='imagePost-buttons_container'>
                <button type='submit' onClick={()=>setImage(imageInput.current.files[0])}>submit changes</button>
                <button type='button' onClick={deleteImg}>delete</button>
                <button type='button' onClick={() => history.push('/home')} >cancel</button>
            </div>
        </form>
        </div>
        </div>
    )
}

export default EditImageForm;

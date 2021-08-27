import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCreateImage } from '../../store/image';
import './postImage.css'

const ImagePostForm = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    // const user_id = useSelector(state => state.session.user?.id);
    const user_id = 1;

    const imageInput = useRef();
    const dropZone = useRef();
    const p1 = useRef();
    const p2 = useRef();

    const [image, setImage] = useState('');
    const [caption, setCaption] = useState('');

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
        // console.log(e.dataTransfer.files) chrome has a bug, wont show unless keyed into like this
        // console.log(e.dataTransfer.files[0]) need to key into it with [0] before using it

        if (e.dataTransfer.files[0].type.includes("image/")){
            let file = e.dataTransfer.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file)
            // console.log(reader.result, 'this the reader result') this was null unless is in the onload
            reader.onload = () => {
                // console.log(reader.result, 'inside load') this works. shows code of image
                dropZone.current.style.backgroundImage = `url('${reader.result}')`;
            };

            imageInput.current.files = e.dataTransfer.files;
            // console.log(image,'this')
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
    }

    const submitImage = async (e) => {
        e.preventDefault();
        console.log(image, 'image sending thru')
        const data = await dispatch(fetchCreateImage(user_id, image, caption))
        console.log(data)
    }

    return (
        <div className='imagePost_container'>
        <form onSubmit={submitImage} encType='multipart/form-data'>
            <div className='dropzone' ref={dropZone} onClick={openInput}
             onDragOver={dragOver} onDragLeave={exitDrag} onDragEnd={exitDrag}
             onDrop={displayImage} >
                <p ref={p1} >Drag and Drop</p>
                <p ref={p2} >or click to submit a file</p>
                <input  onChange={showImage} ref={imageInput} type='file' className='dropzone_input' ></input>
            </div>
                <button type='submit' onClick={()=>setImage(imageInput.current.files[0])} >submit image</button>
                <button type='button' onClick={resetAll}>reset</button>
                <button type='button' onClick={() => history.push('/')} >cancel</button>
        </form>
    </div>
    )
}

export default ImagePostForm

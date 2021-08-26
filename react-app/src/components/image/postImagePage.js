import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './postImage.css'

const ImagePostForm = () => {

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
        dropZone.current.style.backgroundImage = null;
        // console.log(e.dataTransfer.files) this has a bug, wont show unless keyed into like this

        if (e.dataTransfer.files.length){
            let file = e.dataTransfer.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file)
            // console.log(reader.result, 'this the reader result') this was null unless is in the onload
            reader.onload = () => {
                // console.log(reader.result, 'inside load') this works. shows code of image
                dropZone.current.style.backgroundImage = `url('${reader.result}')`;
            };

            imageInput.current.files = e.dataTransfer.files;
        }
        p1.current.classList.add('disappear')
        p2.current.classList.add('disappear')
        dropZone.current.classList.remove('in-dropzone')
    }

    const showImage = (e) => {   // this is for entering an image thru the input box
        // console.log(e.target.files[0])

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
            dropZone.current.classList.remove('in-dropzone')
        }
    }

    const resetAll = () => {
        dropZone.current.style.backgroundImage = null;
        p1.current.classList.remove('disappear')
        p2.current.classList.remove('disappear')
    }

    return (
        <div className='imagePost_container'>
        <form>
            <div className='dropzone' ref={dropZone} onClick={openInput}
             onDragOver={dragOver} onDragLeave={exitDrag} onDragEnd={exitDrag}
             onDrop={displayImage} >
                <p ref={p1} >Drag and Drop</p>
                <p ref={p2} >or click to submit a file</p>
                <input onChange={showImage} ref={imageInput} type='file' className='dropzone_input' ></input>
            </div>
                <button type='submit' >submit image</button>
                <button type='button' onClick={resetAll}>reset</button>
                <button type='button' >cancel</button>
        </form>
    </div>
    )
}

export default ImagePostForm

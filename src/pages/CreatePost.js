import React, { useEffect } from 'react'
import { useState } from 'react'
import { db, auth } from '../firebase-config'
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const CreatePost = ({ isAuth }) => {

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const navigate = useNavigate();

  useEffect( () => {
     if(!isAuth) {
      navigate("/login")
     }
  }, [])

  const postCollectionRef = collection(db, "blogPosts");
  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }
    })
    navigate("/")
  }

  return (
    <div className='createPostPage'>
        <div className='cpContainer'>
            <h1> Create A Post </h1>
            <div className='inputGp'>
                <label> Title: </label>
                <input placeholder='Title...' onChange={ (e) => setTitle(e.target.value)} />
            </div>
            <div className='inputGp'>
                <label> Post: </label>
                <textarea placeholder='Post...'onChange={ (e) => setPostText(e.target.value)}  />
            </div>
            <button onClick={ createPost }> Create </button>
        </div>
    </div>
  )
}

export default CreatePost
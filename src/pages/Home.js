import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase-config';

const Home = ({isAuth}) => {

  const [postLists, setPostLists] = useState([]);
  const postCollectionRef = collection(db, "blogPosts");


  const deletePost = async (id) => {

    // which post you want to delete, thus why we need doc 
      const postDoc = doc( db, "blogPosts", id);
      await deleteDoc(postDoc);

    }



  useEffect( () => {
    const getPostsFromFireStore = async () => {
      const data = await getDocs(postCollectionRef);
      // console.log(data);
      // console.log(data.docs.map(doc => ({...doc.data(), id: doc.id})));
      setPostLists(data.docs.map(doc => ({...doc.data(), id: doc.id})));     
    };
    getPostsFromFireStore();
  }, [deletePost]);



  const posts = postLists.map(post => (
    <div className='post' key={post.id}>
      <div className='postHeader'>
        <div className='title'>
          <h1> { post.title } </h1>
        </div>
        <div className='deletePost'>
          {  
            isAuth &&
            post.author?.id === auth.currentUser?.uid && 
            <button onClick={ () =>  deletePost(post.id) }> &#128465; </button> 
          }
        </div>
      </div>
      <div className='postTextContainer'>
        { post.postText }
      </div>
      <h3> @{post.author?.name }</h3>
    </div>
  ))

  const nothingToShow = (
    <div className='post'>
      <div className='postHeader'>
        <div className='title'>
          <h1>There is no post</h1>
        </div>
      </div>
    </div>
  )

  return (
    <div className='homePage'>
       { posts.length ? posts : nothingToShow }
    </div>
  )
}

export default Home
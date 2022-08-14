import {useState} from 'react'
import { Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Login from './pages/Login'
import { signOut } from 'firebase/auth'
import { auth } from './firebase-config'
import { useNavigate } from 'react-router-dom'
import './App.css';



function App() {


  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const navigate = useNavigate();

  const toSignOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login")
    });
    
  }

  return (
    <>
      <nav>
        <Link to="/"> Home </Link>
        { !isAuth ? (
            <Link to="/login"> Login </Link>
            ) : (
              <>
                <Link to="/createPost"> Create Post </Link>
                { isAuth && <button onClick={ toSignOut } > Logout </button>}
              </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={ <Home  isAuth={isAuth} /> } index />
        <Route path="/createPost" element={ <CreatePost isAuth={isAuth} /> } />
        <Route path="/login" element={ <Login  setIsAuth={ setIsAuth } /> } />
      </Routes>
    </>
  );
}

export default App;

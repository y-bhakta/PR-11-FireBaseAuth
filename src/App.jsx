import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [logedUser, setLogedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogedUser(true);
      } else {
        setLogedUser(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route path='/' element={logedUser ? <Home logedUser={logedUser} /> : <Navigate to="/login" />} />
        <Route path='/signUp' element={!logedUser ? <Signup /> : <Navigate to="/" />} />
        <Route path='/login' element={!logedUser ? <Login setLogedUser={setLogedUser} /> : <Navigate to="/" />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App;
import React, { useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import { toast } from 'react-toastify';

const Login = ({setLogedUser }) => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, user.email, user.password);
            setLogedUser(true);
            toast.success('Logged IN!')
            setTimeout(() => navigate('/'), 1500);
            setUser({});
        } catch (error) {
            setError(error.message);
        }
    }
    const handlegoogle=async()=>{
        try {
            await signInWithPopup(auth,googleProvider);
            setLogedUser(true);
            toast.success('Logged IN with Google!');
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="form-container">
                            <p className="title">Welcome back</p>
                            <p>{error}</p>
                            <form className="form" method='post' onSubmit={handleSubmit}>
                                <input type="email" className="input" name='email' placeholder="Email" onChange={handleChange} value={user.email || ''} />
                                <input type="password" name='password' className="input" placeholder="Password" onChange={handleChange} value={user.password || ''} />
                                <p className="page-link">
                                    <span className="page-link-label">Forgot Password?</span>
                                </p>
                                <button className="form-btn">Log in</button>
                            </form>
                            <p className="sign-up-label">
                                Don't have an account?<span className="sign-up-link"><Link to="/signUp">Sign up</Link></span>
                            </p>
                            <div className="buttons-container">
                                <button className="google-login-button" onClick={handlegoogle}>
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} version="1.1" x="0px" y="0px" className="google-icon" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                                    </svg>
                                    <span>Log in with Google</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
